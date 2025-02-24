const text = {
  line1: "Hey there,",
  line2: "how can I help?"
}

export function WelcomeText() {
  return (
    <h1 className="text-4xl font-bold flex flex-col gap-2">
      <div className="text-gray-500">{text.line1}</div>
      <div>{text.line2}</div>
    </h1>
  )
} 