import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export function CalEmbed() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "intro" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <Cal
      namespace="intro"
      calLink="ilzam/intro"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  )
}
