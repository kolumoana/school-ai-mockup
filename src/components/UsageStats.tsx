"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type UsageData = {
  date: string;
  activeUsers: number;
  conversations: number;
};

export const UsageStats = () => {
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    const fetchUsageData = async () => {
      // ここで実際のAPIからデータを取得する
      // const response = await fetch('/api/usage-stats');
      // const data = await response.json();
      // 仮のデータを生成
      const mockData: UsageData[] = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        activeUsers: Math.floor(Math.random() * 100) + 50,
        conversations: Math.floor(Math.random() * 500) + 200,
      })).reverse();
      setUsageData(mockData);
    };

    fetchUsageData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">利用統計</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>アクティブユーザー数</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>会話数</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
