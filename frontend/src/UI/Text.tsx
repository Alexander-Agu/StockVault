interface TextProp {
    content: string
}

export default function Text({content}: TextProp) {
  return (
    <div className="text-[#737373]">
        {content}
    </div>
  )
}