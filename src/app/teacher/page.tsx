"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const promptSchema = z.object({
  title: z.string().min(1, "教材のタイトルを入力してください"),
  prompt: z.string().min(10, "プロンプトは10文字以上で入力してください"),
});

type PromptFormData = z.infer<typeof promptSchema>;

const TeacherPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
  });

  const onSubmit = async (data: PromptFormData) => {
    setIsLoading(true);
    try {
      // ここでAPIを呼び出して学習アシスタント（教材）を作成する
      // const response = await createLearningAssistant(data);
      console.log("学習アシスタントを作成:", data);
      toast({
        title: "成功",
        description: "学習アシスタント（教材）が正常に作成されました。",
      });
      reset();
    } catch (error) {
      console.error("学習アシスタントの作成に失敗しました:", error);
      toast({
        title: "エラー",
        description: "学習アシスタント（教材）の作成に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
      >
        <h1 className="text-3xl font-bold p-6 bg-gradient-to-r from-orange-400 to-red-600 text-white">
          先生用ダッシュボード
        </h1>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">学習アシスタント（教材）作成</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register("title")} placeholder="教材のタイトル" className="w-full" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Textarea {...register("prompt")} placeholder="プロンプトを入力してください" className="w-full h-32" />
              {errors.prompt && <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
            >
              {isLoading ? "作成中..." : "学習アシスタントを作成"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherPage;
