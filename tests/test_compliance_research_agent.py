import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from urllib.error import HTTPError, URLError
from urllib import request

import pytest

from agents.compliance_research_agent import (
    ComplianceResearchAgent,
    DocumentDownloadError,
)


def test_download_document_handles_urlerror(monkeypatch, tmp_path):
    agent = ComplianceResearchAgent()
    test_path = tmp_path / "doc.txt"

    def fake_urlopen(url):
        raise URLError("network unreachable")

    monkeypatch.setattr(request, "urlopen", fake_urlopen)

    with pytest.raises(DocumentDownloadError) as exc:
        agent.download_document("http://example.com/doc.txt", str(test_path))

    assert "network unreachable" in str(exc.value)
    assert not test_path.exists()


def test_download_document_handles_httperror(monkeypatch, tmp_path):
    agent = ComplianceResearchAgent()
    test_path = tmp_path / "doc.txt"

    def fake_urlopen(url):
        raise HTTPError(url, 404, "Not Found", hdrs=None, fp=None)

    monkeypatch.setattr(request, "urlopen", fake_urlopen)

    with pytest.raises(DocumentDownloadError) as exc:
        agent.download_document("http://example.com/missing.txt", str(test_path))

    assert "HTTP error" in str(exc.value)
    assert not test_path.exists()
