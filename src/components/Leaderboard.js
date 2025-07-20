import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Leaderboard({ currentUserId }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setLeaders(data.leaderboard || []);
      } catch (e) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          {!loading && !error && (
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="py-2">Rank</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Level</th>
                  <th className="py-2">XP</th>
                  <th className="py-2">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((user, i) => (
                  <tr key={user.$id} className={user.$id === currentUserId ? "bg-blue-100 font-bold" : ""}>
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{user.username || user.$id}</td>
                    <td className="py-2">{user.level}</td>
                    <td className="py-2">{user.xp}</td>
                    <td className="py-2">
                      {(user.badges || []).map((b, j) => (
                        <Badge key={j} className="bg-yellow-300 text-black mx-1">{b}</Badge>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
