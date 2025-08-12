import sys
from pathlib import Path
from datetime import datetime

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from agents.agent_activity_tracker import AgentActivityTracker


def test_log_and_retrieve_activity():
    tracker = AgentActivityTracker()
    ts = datetime(2024, 1, 1, 12, 0, 0)
    tracker.log("agentA", "did something", timestamp=ts)
    tracker.log("agentB", "did something else", timestamp=ts)

    all_records = tracker.get_activity()
    assert len(all_records) == 2
    assert all_records[0].agent == "agentA"
    assert all_records[0].action == "did something"

    agent_a_records = tracker.get_activity("agentA")
    assert len(agent_a_records) == 1
    assert agent_a_records[0].timestamp == ts


def test_list_agents_returns_unique_sorted():
    tracker = AgentActivityTracker()
    tracker.log("B", "foo")
    tracker.log("A", "bar")
    tracker.log("A", "baz")

    assert tracker.list_agents() == ["A", "B"]
