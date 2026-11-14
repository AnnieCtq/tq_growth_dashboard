# Interview prep

Answer **out loud first**, then write bullet notes under the question. Link to a KB note when one exists. The coach can run a mock round from this file.

## UVM & testbench architecture

### Walk me through a UVM testbench for a FIFO. Why does each component exist?
- _my answer:_

### What's the difference between a sequence and a sequencer?
- _my answer:_

### How does a monitor get data to a scoreboard, and why is it a broadcast?
- _my answer:_

### When would you use a factory override? Give a real example.
- _my answer:_

### What happens if a test never raises an objection?
- _my answer:_

## SystemVerilog semantics

### Blocking vs non-blocking: when do you use each, and why?
- _my answer:_

### What is a clocking block for? What is skew?
- _my answer:_

### What's the difference between `logic x = expr;` and `assign x = expr;`?
- _my answer:_

### Explain the SystemVerilog scheduling regions you actually rely on.
- _my answer:_

## Coverage & sign-off

### Code vs functional coverage: which tells you the plan is done?
- _my answer:_

### Your covergroup shows 100%. What could still be untested?
- _my answer:_

### Union vs average group score: what does each hide?
- _my answer:_

### Who decides what goes in a covergroup?
- _my answer:_

## Registers & RAL

### Trace a `reg.write()` through RAL to the bus.
- _my answer:_

### Frontdoor vs backdoor: why have both?
- _my answer:_

### Explicit vs implicit prediction?
- _my answer:_

## DPI-C & C++

### Why use a C++ reference model through DPI-C instead of an SV model?
- _my answer:_

### pure vs context imports?
- _my answer:_

### Who owns memory passed across DPI-C?
- _my answer:_

## Debug

### You see a scoreboard mismatch. What do you do in the first 15 minutes?
- _my answer:_

### How do you decide DUT bug vs testbench bug?
- _my answer:_

### Tell me about a debug you're proud of: trigger, root cause, fix, verdict.
- _my answer:_

### A test passes on one simulator and fails on another with the same seed. Is that a bug?
- _my answer:_

## Automation & regression

### Walk me through your nightly regression end to end.
- _my answer:_

### How do you make sure a crashed regression doesn't leave resources locked?
- _my answer:_

### How do your scripts report failure to the caller?
- _my answer:_

### How would you speed up a regression that takes too long?
- _my answer:_

## Behavioural

### Tell me about a time you removed something hardcoded. How did you know it was safe?
- _my answer:_

### How do you check an AI-generated explanation before you trust it?
- _my answer:_

### Something you got wrong and what you changed afterwards.
- _my answer:_
