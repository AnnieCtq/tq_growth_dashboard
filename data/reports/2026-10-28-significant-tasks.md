---
date: 2026-10-28
title: Significant tasks, October 2026
kind: significant
---

# Significant tasks, October 2026

1. Debugged the blk_status checker that failed with multiple DMA-engine instances. The issue involved uvm_hdl_read for the hierarchy paths and virtual interfaces for the clocks. It took a few days of reasoning and 2 days of debugging, using uvm_hdl_read from another checker as reference. I lost about a week of regression work on this task.
2. ACC_BE frontdoor register access with the RAL register model, adapter and sideband-bus UVC.
