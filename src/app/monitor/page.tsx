"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StudentActivity = {
  id: string;
  name: string;
  lastActive: string;
  totalSessions: number;
  averageSessionDuration: number;
  completedLessons: number;
};

const StudentMonitorPage = () => {
  const [students, setStudents] = useState<StudentActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchStudentData = async () => {
      // ここで実際のAPIからデータを取得する
      // const response = await fetch('/api/student-activities');
      // const data = await response.json();
      // 仮のデータを生成
      const mockData: StudentActivity[] = Array.from({ length: 20 }, (_, i) => ({
        id: `student-${i + 1}`,
        name: `生徒${i + 1}`,
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        totalSessions: Math.floor(Math.random() * 50) + 10,
        averageSessionDuration: Math.floor(Math.random() * 30) + 15,
        completedLessons: Math.floor(Math.random() * 20) + 5,
      }));
      setStudents(mockData);
    };

    fetchStudentData();
  }, []);

  const filteredAndSortedStudents = students
    .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "lastActive") return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      if (sortBy === "totalSessions") return b.totalSessions - a.totalSessions;
      if (sortBy === "averageSessionDuration") return b.averageSessionDuration - a.averageSessionDuration;
      if (sortBy === "completedLessons") return b.completedLessons - a.completedLessons;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-6 text-white text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          生徒活動モニター
        </motion.h1>
        <Card className="bg-white bg-opacity-90 backdrop-blur-lg mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                placeholder="生徒名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">並び替え:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="並び替え基準" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">名前</SelectItem>
                    <SelectItem value="lastActive">最終アクティブ</SelectItem>
                    <SelectItem value="totalSessions">総セッション数</SelectItem>
                    <SelectItem value="averageSessionDuration">平均セッション時間</SelectItem>
                    <SelectItem value="completedLessons">完了レッスン数</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white bg-opacity-90 backdrop-blur-lg">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>最終アクティブ</TableHead>
                    <TableHead>総セッション数</TableHead>
                    <TableHead>平均セッション時間 (分)</TableHead>
                    <TableHead>完了レッスン数</TableHead>
                    <TableHead>詳細</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{new Date(student.lastActive).toLocaleString()}</TableCell>
                      <TableCell>{student.totalSessions}</TableCell>
                      <TableCell>{student.averageSessionDuration}</TableCell>
                      <TableCell>{student.completedLessons}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentMonitorPage;
