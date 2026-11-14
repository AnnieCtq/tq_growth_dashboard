# Project Seam Contract

> **What this file is:** the single source of truth for the interface agreements between the three layers of the project. It is a *living state file* — overwritten in place, not appended. It always reflects the **current** agreed interfaces, with no session history to dig through.
>
> **Who writes what:**
> - DPI-C contract — **SV side** authored by the DE+DV skill, **C side** authored (and primarily owned) by the DPI-C + C++ skill. Both sides must match.
> - Build/link contract — authored solely by the DPI-C + C++ skill. The Automation skill **reads** it and never edits it.
> - Reviewers **check code against** this file but do not edit it; mismatches are flagged to the owning skill.
>
> Update the "Last updated" date whenever any entry changes.

**Last updated:** _(date)_

---

## 1. DPI-C Contract (SV ↔ C/C++)

One row per imported/exported function. SV side and C side must agree on every column.

| Function | Direction (SV→C / C→SV) | SV signature | C/C++ signature | Arg directions (in/out/inout) | SV↔C type mapping | Memory ownership (who allocs / who frees) | Pure or Context |
|----------|------------------------|--------------|------------------|-------------------------------|--------------------|--------------------------------------------|-----------------|
| _e.g. `bus_txn`_ | SV→C (import) | `import "DPI-C" context function ...` | `extern "C" int bus_txn(...)` | addr: in, data: inout | `bit[31:0]` ↔ `svBitVecVal*` | C allocates result buffer, SV must not free | context |
|  |  |  |  |  |  |  |  |

### `chandle` / pointer lifetime notes
_(For any `chandle` crossing the boundary: what object it points to, who owns it, when it is valid, when it is destroyed.)_

---

## 2. Build / Link Contract (C++ ↔ Automation)

Authored by the DPI-C + C++ skill. Consumed (read-only) by the Automation skill.

### Shared library build
- **Source files:** _..._
- **Compiler + flags:** _e.g. `g++ -std=c++17 -fPIC -shared ...`_
- **Output artifact:** _e.g. `libref_model.so`_

### Link into simulator
- **`-sv_lib` name:** _..._
- **Other link/elaboration flags:** _..._

### Commands the automation layer must call
| Stage | Exact command | Success criterion (exit code / output) |
|-------|---------------|----------------------------------------|
| Compile C++ | _..._ | exit 0 |
| Compile/elaborate sim | _..._ | exit 0 |
| Run | _..._ | exit 0 + pass string in log |

### Notes / portability
_(Simulator-specific differences: VCS / Questa / Xcelium.)_

---

## Change log (most recent first)
_(Brief one-line note each time a contract entry changes, so both sides can spot drift. Detailed history goes in `project_historian.md`.)_

- _(date)_ — initial template created
