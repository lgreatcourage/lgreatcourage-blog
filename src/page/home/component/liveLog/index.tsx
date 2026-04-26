import { Lens } from "@/components/ui/lens"
import graduationPhoto from "@/assets/img/graduation_photo.jpg"
import { Image } from "antd"
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export const LiveLogSection = () => {
    const [isTouchLayout, setIsTouchLayout] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)")
        const updateLayout = (e: MediaQueryList | MediaQueryListEvent) => {
            setIsTouchLayout(e.matches)
        }

        updateLayout(mediaQuery)
        mediaQuery.addEventListener("change", updateLayout)

        return () => {
            mediaQuery.removeEventListener("change", updateLayout)
        }
    }, [])

    return <>
        <Card className="relative shadow-none" >
            <CardHeader>
                {isTouchLayout ? (
                    <Image src={graduationPhoto} alt="本科毕业照" />
                ) : (
                    <Lens defaultPosition={{ x: 260, y: 150 }}>
                        <img
                            src={graduationPhoto}
                            alt="image placeholder"
                            width={500}
                            height={500}
                        />
                    </Lens>
                )}
            </CardHeader>
            <CardContent className="pb-5" style={{ display: "flex", flexDirection: "column", alignItems: "center",gap: "1rem" }}>
                <CardTitle className="text-2xl">本科毕业照</CardTitle>
                <CardDescription>
                    2025年6月23日
                </CardDescription>
            </CardContent>
            {/*<CardFooter className="space-x-4">*/}
            {/*    <Button>Let&apos;s go</Button>*/}
            {/*    <Button variant="secondary">Another time</Button>*/}
            {/*</CardFooter>*/}
        </Card>
    </>
}
