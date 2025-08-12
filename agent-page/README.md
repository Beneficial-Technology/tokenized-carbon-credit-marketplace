# Agent Interface

This directory hosts a standalone interface for exploring and chatting with 20 specialized agents across the project lifecycle.

## Usage

Serve the page locally:

```bash
python -m http.server --directory agent-page
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. Use the dropdown to select an agent to view its role, tasks, and tools, and send chat messages (echoed back) for quick experimentation.
