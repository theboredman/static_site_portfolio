# Episodic Memory Lifecycle — BCSBatighor GK System

**Author:** Saif (Episodic Memory Layer Lead)  
**Last Updated:** 2026-02-23

---

## Overview

The Episodic Memory Layer provides long-term experiential memory for the BCSBatighor GK system. It records how the system used KG facts, what MCQs it generated, how they were evaluated, and how the system improved over time. This enables experience-informed question generation and adaptive quality improvement.

**Implementation:** `episodic_store.py` → `EpisodicMemory`  
**Database:** `memory.db` (SQLite)

---

## Database Schema

### Table 1: `episodes`

High-level event metadata for each generation event.

| Column              | Type    | Description                                                |
| ------------------- | ------- | ---------------------------------------------------------- |
| `episode_id`        | TEXT PK | UUID for the episode                                       |
| `input_question`    | TEXT    | The Bangla (or English) question that triggered generation |
| `intent`            | TEXT    | Detected intent (e.g., `factual_recall`, `comparison`)     |
| `blueprint`         | TEXT    | MCQ blueprint type (e.g., `single_correct_answer`)         |
| `topic`             | TEXT    | Topic string matching a TOPIC node in the KG               |
| `timestamp`         | TEXT    | ISO 8601 creation timestamp                                |
| `generation_config` | TEXT    | JSON snapshot of generator config                          |
| `embedding`         | BLOB    | Optional vector embedding of input question                |
| `overall_score`     | REAL    | Aggregate quality score (0.0–1.0)                          |
| `accepted`          | INTEGER | 1 if accepted by judge, 0 if rejected                      |
| `decay_score`       | REAL    | Computed decay score for selective forgetting              |

### Table 2: `episode_facts`

Many-to-many link between episodes and KG Fact IDs.

| Column       | Type    | Description                             |
| ------------ | ------- | --------------------------------------- |
| `id`         | INTEGER | Auto-increment primary key              |
| `episode_id` | TEXT FK | References `episodes.episode_id`        |
| `fact_id`    | TEXT    | KG Fact node ID (e.g., `FACT_a1b2c3d4`) |

### Table 3: `episode_mcqs`

Generated MCQs per episode.

| Column               | Type    | Description                             |
| -------------------- | ------- | --------------------------------------- |
| `mcq_id`             | TEXT PK | UUID for the MCQ                        |
| `episode_id`         | TEXT FK | References `episodes.episode_id`        |
| `question`           | TEXT    | MCQ question text                       |
| `options`            | TEXT    | JSON array of options                   |
| `correct_answer`     | TEXT    | Correct answer string                   |
| `difficulty`         | TEXT    | `easy`, `medium`, `hard`                |
| `quality_score`      | REAL    | Quality score for this MCQ (0.0–1.0)    |
| `regeneration_round` | INTEGER | How many times this MCQ was regenerated |

### Table 4: `rejection_logs`

Failure diagnostics per episode.

| Column           | Type    | Description                              |
| ---------------- | ------- | ---------------------------------------- |
| `id`             | INTEGER | Auto-increment primary key               |
| `episode_id`     | TEXT FK | References `episodes.episode_id`         |
| `reason`         | TEXT    | Short reason code for rejection          |
| `judge_feedback` | TEXT    | Detailed textual feedback from the judge |
| `timestamp`      | TEXT    | ISO 8601 timestamp of rejection          |

---

## Memory Lifecycle

### Phase 1: Episode Creation (`write_episode()`)

An episode is created whenever the system generates MCQs from a set of KG facts.

```
Input Question → Intent Detection → Fact Retrieval → MCQ Generation → Episode Written
```

**What gets stored:**

- The input question and detected intent
- Blueprint type and topic
- KG fact IDs used (references only, no text duplication)
- Generated MCQs with quality scores
- Generator configuration snapshot
- Initial decay score (computed from acceptance and quality)

**Trigger:** Called after each MCQ generation round.

---

### Phase 2: Experience Retrieval (`retrieve_similar_episodes()`)

Before generating new MCQs, the system retrieves past episodes to learn from previous successes and failures.

```
New Request → Find Similar Episodes → Use historical outcomes to guide generation
```

**Similarity criteria:**

- **Topic match:** Exact match on the topic field
- **Fact overlap:** Episodes that used overlapping KG fact IDs (via `episode_facts` join)
- **Minimum score threshold:** Only return episodes above a quality floor

**Use case:**

- If previous Geography episodes scored poorly, the system can adjust its generation strategy
- If a fact repeatedly led to rejected MCQs, it can be avoided or refined

---

### Phase 3: Judge Feedback (`update_episode()`)

After MCQs are evaluated by a judge (human or automated), the episode is updated.

```
Episode → Judge Evaluation → Accept/Reject → Update Episode → Log Rejection (if rejected)
```

**Updates applied:**

- `accepted` flag (0 or 1)
- `overall_score` (updated quality score)
- `decay_score` (recomputed based on new acceptance and score)
- `regeneration_round` on MCQs (if regenerated)
- New entry in `rejection_logs` with reason and feedback

---

### Phase 4: Selective Forgetting (`forget_old_episodes()`)

Over time, old and low-quality episodes are pruned to keep the memory efficient and relevant.

```
All Episodes → Apply Decay Formula → Check Preservation Rules → Prune or Keep
```

**Decay formula:**

$$
\text{decay} = e^{-\lambda \times \text{age\_days}}
$$

Where $\lambda = 0.05$ (configurable via `DECAY_LAMBDA`).

**Penalty multipliers:**

- If `accepted == 0`: decay × 0.6
- If `overall_score < 0.5`: decay × 0.7

**Preservation rules (never deleted):**

- `accepted == 1` AND `overall_score > 0.85`

**Deletion conditions (any one sufficient):**

- `decay_score < decay_threshold` (default 0.1)
- `timestamp > max_age_days` AND `accepted == 0`

**Cascade deletion:** When an episode is deleted, all related rows in `episode_facts`, `episode_mcqs`, and `rejection_logs` are also removed.

---

## Diagnostic APIs

These APIs support cross-component analysis and adaptive improvement.

### `get_failed_facts(top_n)`

Returns the top-N KG fact IDs most frequently associated with rejected episodes. Enables the Fact Quality Gate to re-evaluate or remove problematic facts.

### `get_high_performing_topics()`

Returns topic-level statistics: average score, acceptance rate, and question count. Used by the KG adaptive growth logic to decide topic expansion.

### `get_recent_topic_trend(topic, days)`

Time-series of scores for a specific topic to track performance evolution.

### `get_episodes_by_time_range(start_dt, end_dt)`

Retrieve all episodes within a datetime range for batch analysis.

### `get_episode_detail(episode_id)`

Full record of an episode including linked fact IDs, MCQs, and rejection logs.

---

## Integration with Knowledge Graph

The Episodic Memory Layer integrates with the KG through fact ID references:

1. **Episode → Facts:** Each episode stores KG fact IDs (e.g., `FACT_a1b2c3d4`) in the `episode_facts` table. No fact text is duplicated.

2. **Facts → Questions:** The KG links Question nodes to Fact nodes via `ASKS_FOR` edges. Episodes reference the same fact IDs, enabling join queries.

3. **Failure Feedback Loop:**

   ```
   get_failed_facts() → identify problematic fact IDs
       → FactQualityGate re-evaluates those facts
       → Facts refined or removed from KG
       → Future episodes use improved facts
   ```

4. **Topic Performance Loop:**
   ```
   get_high_performing_topics() → identify underperforming topics
       → KG analyze_topic_density() recommends expansion
       → New facts scraped for expanded topics
       → Better MCQs generated
   ```

---

## API Reference

### EpisodicMemory Methods

| Method                                | Description                                          |
| ------------------------------------- | ---------------------------------------------------- |
| `write_episode(...)`                  | Create a new episode record                          |
| `retrieve_similar_episodes(...)`      | Find past episodes by topic, fact overlap, and score |
| `update_episode(...)`                 | Update episode after judge evaluation                |
| `forget_old_episodes(...)`            | Prune low-quality, old episodes                      |
| `get_failed_facts(top_n)`             | Top fact IDs associated with rejections              |
| `get_high_performing_topics()`        | Topic-level performance stats                        |
| `get_recent_topic_trend(topic, days)` | Time-series scores for a topic                       |
| `get_episodes_by_time_range(s, e)`    | Episodes within a datetime range                     |
| `get_episode_detail(episode_id)`      | Full episode record with MCQs and logs               |
| `summary()`                           | Print database statistics                            |
| `close()`                             | Close the database connection                        |

---

## Example Usage

```python
from episodic_store import EpisodicMemory

mem = EpisodicMemory("memory.db")

# Write an episode
episode_id = mem.write_episode(
    input_question="বাংলাদেশের রাজধানী কী?",
    intent="factual_recall",
    blueprint="single_correct_answer",
    topic="Geography",
    fact_ids=["FACT_abc123", "FACT_def456"],
    mcqs=[{
        "question": "What is the capital of Bangladesh?",
        "options": ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
        "correct_answer": "Dhaka",
        "difficulty": "easy",
        "quality_score": 0.92,
        "regeneration_round": 0,
    }],
    overall_score=0.92,
    accepted=1,
    generation_config={"difficulty": "easy", "prompt_version": "v1"},
)

# Retrieve similar episodes before next generation
similar = mem.retrieve_similar_episodes(topic="Geography", min_score=0.5)

# Update after judge feedback
mem.update_episode(
    episode_id=episode_id,
    accepted=1,
    overall_score=0.95,
    rejection_reason=None,
    judge_feedback="Excellent question.",
)

# Selective forgetting
pruned = mem.forget_old_episodes(decay_threshold=0.1, max_age_days=90)

# Diagnostics
failed_facts = mem.get_failed_facts(top_n=5)
topic_stats = mem.get_high_performing_topics()

mem.close()
```
