import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function NewsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-[72px]">
          <Card>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Generate some long content to force scrolling */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold">News Item {i + 1}</h3>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
