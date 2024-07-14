"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

type UsageData = {
  date: string;
  activeUsers: number;
  conversations: number;
};

const StatsPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-6 text-white text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          利用統計
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white bg-opacity-90 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">アクティブユーザー数</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip />
                    <Line type="monotone" dataKey="activeUsers" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white bg-opacity-90 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">会話数</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversations" stroke="#EC4899" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
