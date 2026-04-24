import { Lens } from "@/components/ui/lens"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export const LiveLogSection = () => {
    return <>
        <Card className="relative w-[300px] shadow-none" >
            <CardHeader>
                <Lens defaultPosition={{ x: 260, y: 150 }}>
                    <img
                        src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="image placeholder"
                        width={500}
                        height={500}
                    />
                </Lens>
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