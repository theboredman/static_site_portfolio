# Knowledge Graph Schema — BCSBatighor GK System

**Author:** Souvik (KG Schema and Construction Lead)  
**Last Updated:** 2026-02-23

---

## Overview

The Knowledge Graph (KG) is the structural backbone of the BCSBatighor GK pipeline. It stores atomic facts, entities, sources, topics, and questions as nodes, connected by typed directed edges. The graph is implemented using `networkx.MultiDiGraph()` to support multiple parallel relations between the same pair of nodes.

**Implementation:** `kg_builder.py` → `KnowledgeGraphBuilder`  
**Persistence:** Pickled snapshots saved as `kg_YYYY_MM.gpickle`

---

## Node Types

### 1. Entity

Represents a real-world named entity mentioned in facts.

| Attribute | Type | Description                                                                                                                           |
| --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | str  | Always `"ENTITY"`                                                                                                                     |
| `subtype` | str  | One of: `PERSON`, `ORGANIZATION`, `COUNTRY`, `PLACE`, `CITY`, `RIVER`, `MOUNTAIN`, `ANIMAL`, `PLANT`, `INSTITUTION`, `CURRENCY`, etc. |
| `name`    | str  | Original entity name (e.g., `"Sheikh Mujibur Rahman"`)                                                                                |

**Node ID format:** `ENTITY_{normalized_name}` (spaces replaced with underscores)

---

### 2. Fact

An atomic factual claim extracted from a source.

| Attribute               | Type  | Description                                                                    |
| ----------------------- | ----- | ------------------------------------------------------------------------------ |
| `type`                  | str   | Always `"FACT"`                                                                |
| `text`                  | str   | The fact sentence                                                              |
| `language_confidence`   | float | Confidence in language correctness (0.0–1.0)                                   |
| `extraction_confidence` | float | Confidence in extraction accuracy (0.0–1.0)                                    |
| `source_reliability`    | float | Reliability score of the originating source (0.0–1.0)                          |
| `temporal_freshness`    | float | How fresh/current the fact is (0.0–1.0)                                        |
| `created_at`            | str   | ISO timestamp of when the fact was added to the KG                             |
| `composite_score`       | float | Weighted composite quality score (set by `fact_quality.py`)                    |
| `quality_verdict`       | str   | One of: `ACCEPT`, `REFINE`, `SALVAGEABLE`, `REJECT` (set by `fact_quality.py`) |
| `linguistic_clarity`    | float | Clarity of the text (set by `fact_quality.py`)                                 |
| `factual_structure`     | float | Structural quality score (set by `fact_quality.py`)                            |
| `mcq_tags`              | dict  | MCQ type suitability flags (set by `fact_quality.py`)                          |
| `mcq_suitable_for`      | list  | List of MCQ types this fact is suitable for                                    |
| `mcq_readiness`         | float | Overall readiness score for MCQ generation (0.0–1.0)                           |
| `unmapped`              | bool  | True if this fact has no linked question                                       |
| `merged_from`           | list  | List of dicts with `id` and `text` of merged duplicate facts                   |

**Node ID format:** `FACT_{uuid_hex_8}`

---

### 3. Source

Represents the origin of a fact (a URL and/or publication).

| Attribute   | Type | Description                               |
| ----------- | ---- | ----------------------------------------- |
| `type`      | str  | Always `"SOURCE"`                         |
| `url`       | str  | Full URL of the source                    |
| `publisher` | str  | Publisher name (e.g., `"The Daily Star"`) |

**Node ID format:** `SOURCE_{uuid5_of_url}`

---

### 4. Topic

Represents a knowledge domain or category.

| Attribute | Type | Description                                        |
| --------- | ---- | -------------------------------------------------- |
| `type`    | str  | Always `"TOPIC"`                                   |
| `name`    | str  | Topic name (e.g., `"Geography"`, `"Appointments"`) |

**Node ID format:** `TOPIC_{NAME_UPPER}` (e.g., `TOPIC_GEOGRAPHY`)

**Associated Stats (in-memory via `topic_stats` dict):**

| Stat Key             | Type | Description                                   |
| -------------------- | ---- | --------------------------------------------- |
| `fact_count`         | int  | Number of Fact nodes linked to this topic     |
| `question_count`     | int  | Number of Question nodes linked to this topic |
| `unmapped_facts`     | int  | Facts not linked to any question              |
| `unmapped_questions` | int  | Questions not linked to any fact              |

---

### 5. Question

Represents a question — original, generated, or refined.

| Attribute       | Type | Description                                      |
| --------------- | ---- | ------------------------------------------------ |
| `type`          | str  | Always `"QUESTION"`                              |
| `text`          | str  | The question text (Bangla or English)            |
| `question_type` | str  | One of: `"original"`, `"generated"`, `"refined"` |
| `created_at`    | str  | ISO timestamp of creation                        |

**Node ID format:** `QUESTION_{uuid_hex_8}`

---

## Edge Types (Relations)

All edges are directed. The KG uses `nx.MultiDiGraph()` so multiple edges between the same pair of nodes are supported.

| Relation       | Source Node Type | Target Node Type | Description                                             |
| -------------- | ---------------- | ---------------- | ------------------------------------------------------- |
| `SUBJECT_OF`   | Entity           | Fact             | The entity is the subject of the fact                   |
| `OBJECT_IS`    | Fact             | Entity           | The fact's object is this entity                        |
| `SUPPORTED_BY` | Fact             | Source           | The fact is supported/cited by this source              |
| `ABOUT`        | Fact / Question  | Topic            | The fact or question is about this topic                |
| `ASKS_FOR`     | Question         | Fact             | The question asks about this fact                       |
| `DERIVED_FROM` | Question         | Question         | This question was derived from a parent question        |
| `REFINES`      | Question         | Question         | This refined question improves upon the parent question |

### Edge Data

Every edge carries at minimum:

```python
{"relation": "<RELATION_TYPE>"}
```

---

## Graph Structure Diagram

```
                    ┌────────────┐
                    │   SOURCE   │
                    │  (URL, pub)│
                    └─────▲──────┘
                          │ SUPPORTED_BY
                          │
┌──────────┐  SUBJECT_OF  ┌──────────┐  ABOUT   ┌──────────┐
│  ENTITY  │─────────────►│   FACT   │─────────►│  TOPIC   │
│  (PERSON,│              │ (atomic  │          │ (domain) │
│   PLACE) │◄─────────────│  claim)  │          └────▲─────┘
└──────────┘   OBJECT_IS  └──────────┘               │ ABOUT
                               ▲                     │
                               │ ASKS_FOR       ┌────┴─────┐
                               │                │ QUESTION │
                               └────────────────│(original,│
                                                │generated,│
                                  DERIVED_FROM  │ refined) │
                              ┌────────────────►│          │
                              │   REFINES       └──────────┘
                              │                      │
                         ┌────┴─────┐                │
                         │ QUESTION │◄───────────────┘
                         │ (parent) │
                         └──────────┘
```

---

## Adaptive Growth Logic

The KG builder tracks density metrics per topic and recommends expansion strategies:

| Condition                                          | Action         | Description                                    |
| -------------------------------------------------- | -------------- | ---------------------------------------------- |
| `fact_count > fact_threshold` (default 50)         | `EXPAND_DEPTH` | Too many facts in one topic → create subtopics |
| `question_count > question_threshold` (default 30) | `EXPAND_DEPTH` | Too many questions → refine into subtopics     |
| `unmapped_items > unmapped_threshold` (default 10) | `EXPAND_WIDTH` | Unlinked items → explore adjacent topics       |

**API:** `kg_builder.analyze_topic_density()`

---

## Snapshot Persistence

Snapshots persist **both** the graph and `topic_stats` as a single dict:

```python
# save_snapshot writes:
{"graph": self.graph, "topic_stats": self.topic_stats}
```

- **Save:** `kg_builder.save_snapshot(folder="snapshots")`  
  → Creates `snapshots/kg_YYYY_MM.gpickle`  
  → Stores `{"graph": MultiDiGraph, "topic_stats": dict}` via `pickle`
- **Load:** `kg_builder.load_snapshot(filepath)`  
  → Restores graph **and** topic_stats from the saved dict  
  → **Legacy support:** if the pickle contains a plain `MultiDiGraph` (old format), the graph is loaded and `topic_stats` are rebuilt by scanning `TOPIC` nodes and `ABOUT` edges  
  → Handles `FileNotFoundError` and corrupt-file errors gracefully

### Entity Subtype Validation

`add_entity()` validates the `subtype` argument against `ALLOWED_ENTITY_SUBTYPES`:

```
PERSON, ORGANIZATION, COUNTRY, PLACE, CITY, RIVER, MOUNTAIN,
FOREST, OCEAN, INSTITUTION, EVENT, DOCUMENT, TREATY, AWARD,
LANGUAGE, CURRENCY, ANIMAL, PLANT
```

Unknown subtypes trigger a warning but are still added (to avoid data loss).

---

## Quality Gate Integration

The `fact_quality.py` module (Galib) attaches quality attributes to Fact nodes:

1. **Scoring:** `composite_score`, `linguistic_clarity`, `factual_structure`, `source_reliability`, `temporal_freshness`
2. **Verdict:** `quality_verdict` — determines if a fact stays in the graph
3. **MCQ Tags:** `mcq_tags`, `mcq_suitable_for`, `mcq_readiness` — used by downstream MCQ generation
4. **Deduplication:** `merged_from` tracks merged duplicate facts

---

## Episodic Memory Integration

The `episodic_store.py` module (Saif) links episodes to KG Fact IDs:

- Episode records reference `FACT_*` node IDs (not text copies)
- Diagnostic APIs (e.g., `get_failed_facts()`) identify facts that repeatedly lead to rejected MCQs
- The pipeline can use these diagnostics to update fact quality attributes and trigger re-evaluation

---

## API Reference

### KnowledgeGraphBuilder Methods

| Method                           | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `add_entity(name, subtype)`      | Add an Entity node                                   |
| `add_fact(text, **quality)`      | Add a Fact node with quality attributes              |
| `add_source(url, publisher)`     | Add a Source node                                    |
| `add_topic(topic_name)`          | Add a Topic node                                     |
| `add_question(text, ...)`        | Add a Question node with links                       |
| `link(source, target, relation)` | Create a directed edge                               |
| `insert_fact_pipeline(...)`      | Full fact insertion with entities, topic, and source |
| `mark_fact_unmapped(id, topic)`  | Mark a fact as unmapped                              |
| `get_unmapped_facts()`           | Get all unmapped fact IDs                            |
| `analyze_topic_density(...)`     | Get expansion recommendations                        |
| `get_topic_stats()`              | Get topic-level statistics                           |
| `get_facts_by_topic(name)`       | Get all fact IDs for a topic                         |
| `get_questions_by_topic(name)`   | Get all question IDs for a topic                     |
| `get_fact_data(fact_id)`         | Get a fact node's data dict                          |
| `update_fact_attribute(id,k,v)`  | Update a single attribute on a fact                  |
| `remove_fact(fact_id)`           | Remove a fact and update stats                       |
| `save_snapshot(folder)`          | Save graph to pickle                                 |
| `load_snapshot(filepath)`        | Load graph from pickle                               |
| `summary()`                      | Print node/edge counts                               |
