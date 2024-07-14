"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const features = [
  {
    href: "/chat",
    label: "チャットボット",
    description: "AI学習アシスタントと対話し、学習を進めましょう。",
    icon: "💬",
  },
  {
    href: "/teacher",
    label: "先生用ダッシュボード",
    description: "学習教材の作成や管理を行います。",
    icon: "👩‍🏫",
  },
  {
    href: "/stats",
    label: "利用統計",
    description: "サービスの利用状況を分析します。",
    icon: "📊",
  },
  {
    href: "/monitor",
    label: "生徒活動モニター",
    description: "生徒の学習進捗を追跡します。",
    icon: "👀",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="container mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-8 text-white text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI学習チャットボットサービス
        </motion.h1>
        <motion.p
          className="text-xl text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          最先端のAI技術で、学習をより効果的に、より楽しく。
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <MotionLink
              key={feature.href}
              href={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="no-underline"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-2">{feature.icon}</span>
                    {feature.label}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    アクセス
                  </Button>
                </CardContent>
              </Card>
            </MotionLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
