import { useEffect, useState } from 'react';

function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClaims(page);
    // eslint-disable-next-line
  }, []);

  const loadClaims = async (pg) => {
    setLoading(true);
    const res = await fetch(`/api/claims?page=${pg}&limit=10`);
    const data = await res.json();
    setClaims((prev) => [...prev, ...data.claims]);
    setHasMore((pg * 10) < data.total);
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadClaims(nextPage);
  };

  return (
    <div>
      <h2>Claims</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id}>
            #{claim.id} - {claim.claimant} - ${claim.amount} - {claim.status}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default ClaimsList;
