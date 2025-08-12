"""Compliance research agent utilities."""

from __future__ import annotations

import logging
from urllib import request
from urllib.error import HTTPError, URLError

from agents.models import Requirement

logger = logging.getLogger(__name__)


class DocumentDownloadError(Exception):
    """Raised when the agent fails to download a document."""


class ComplianceResearchAgent:
    """Agent capable of downloading compliance related documents."""

    def download_document(self, url: str, dest_path: str) -> str:
        """Download a document from ``url`` to ``dest_path``.

        Parameters
        ----------
        url:
            The URL of the document to download.
        dest_path:
            Local path where the downloaded content should be written.

        Returns
        -------
        str
            The destination path where the file was saved.

        Raises
        ------
        DocumentDownloadError
            If the document could not be downloaded due to network errors.
        """

        try:
            with request.urlopen(url) as response:
                content = response.read()
        except HTTPError as e:
            msg = f"HTTP error while downloading {url}: {e.code} {e.reason}"
            logger.error(msg)
            raise DocumentDownloadError(msg) from e
        except URLError as e:
            msg = f"URL error while downloading {url}: {e.reason}"
            logger.error(msg)
            raise DocumentDownloadError(msg) from e

        with open(dest_path, "wb") as file:
            file.write(content)
        return dest_path
