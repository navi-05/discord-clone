'use client'

import data from '@emoji-mart/data'
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';
import Picker from '@emoji-mart/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPicker = ({
  onChange
}: EmojiPickerProps) => {

  const { resolvedTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className='text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition' />
      </PopoverTrigger>
      <PopoverContent
        side='right'
        sideOffset={40}
        className='bg-transparent border-none shadow-none drop-shadow-none mb-16'
      >
        <Picker
          data={data}
          theme={resolvedTheme}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker