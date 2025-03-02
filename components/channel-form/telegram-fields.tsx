"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import type { ChannelFormData } from "@/lib/db/schema/channels"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface TelegramFieldsProps {
  form: UseFormReturn<ChannelFormData>
}

export function TelegramFields({ form }: TelegramFieldsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function getChatId() {
    const botToken = form.getValues("botToken")
    if (!botToken) {
      toast({
        title: "错误",
        description: "请先输入 Bot Token",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/getUpdates`
      )
      const data = await response.json() as { 
        ok: boolean
        result: Array<{
          message: {
            chat: {
              id: number
            }
          }
        }>
        description?: string
      }
      
      if (!response.ok) {
        throw new Error(data.description || "获取失败")
      }

      if (!data.result?.length) {
        throw new Error("未找到任何消息,请先发送一条消息给机器人")
      }

      const chatId = data.result[0].message.chat.id
      form.setValue("chatId", chatId.toString())
      
      toast({
        title: "成功",
        description: "已获取到 Chat ID",
      })
    } catch (error) {
      toast({
        title: "获取失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <FormField
        control={form.control}
        name="botToken"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Bot Token
              <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="请输入 Bot Token" 
                className="font-mono"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              通过 <a 
                href="https://t.me/BotFather" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Bot Father
              </a> 申请创建一个新的机器人,之后在下方输入获取到的令牌
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="chatId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Chat ID
              <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input 
                  placeholder="请输入 Chat ID" 
                  {...field} 
                />
              </FormControl>
              <Button 
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={getChatId}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                获取会话 ID
              </Button>
            </div>
            <FormDescription>
              点击你的机器人,随便发送一条消息,之后点击上方的「获取会话 ID」按钮
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
} 