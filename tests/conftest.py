import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from agents.models import Requirement


@pytest.fixture
def requirement_factory():
    """Factory fixture for creating Requirement instances."""

    def _factory(**kwargs):
        defaults = {"name": "Test Requirement", "document_url": "http://example.com/doc.txt"}
        defaults.update(kwargs)
        return Requirement(**defaults)

    return _factory
