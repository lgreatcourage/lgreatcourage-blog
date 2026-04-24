import {OrbitingCircles} from "@/components/ui/orbiting-circles.tsx"

export function TechOrbitingCircles(){
    return <>
        <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden">
            <OrbitingCircles iconSize={50} radius={250} >
                <Icons.cssThree/>
                <Icons.htmlFive/>
                <Icons.typeScript/>
                <Icons.vue/>
                <Icons.reactimg/>
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={150} reverse speed={2}>
                <Icons.java/>
                <Icons.springBoot/>
                <Icons.python/>
                <Icons.mySQL/>
            </OrbitingCircles>
            <Icons.myAvater />
        </div>
    </>
}
import LWYIMAGE from  '@/assets/private/R-C.jpg'
import CSS3Img from '@/assets/icon/technology/CSS3.svg'
import HTML5Img from '@/assets/icon/technology/html.svg'
import javaScriptImg from '@/assets/icon/technology/JavaScript.svg'
import vueImg from '@/assets/icon/technology/Vue.svg'
import reactImg from '@/assets/icon/technology/react.svg'
import typeScriptImg from '@/assets/icon/technology/typescript.svg'
import javaImg from '@/assets/icon/technology/java.svg'
import springBootImg from '@/assets/icon/technology/springboot.svg'
import pythonImg from '@/assets/icon/technology/Python.svg'
import mySQLImg from '@/assets/icon/technology/Mysql.svg'
const avaterStyles = {
    borderRadius: '50%',
}
const Icons = {
    cssThree: () => (
        <img src={CSS3Img} alt="CSS3 图标" width="100px" height="100px" />
    ),
    htmlFive: () => (
        <img src={HTML5Img} alt="CSS3 图标" width="100px" height="100px" />
    ),
    javaScript:() => (
        <img src={javaScriptImg} alt="CSS3 图标" width="100px" height="100px" />
    ),
    typeScript:() => (
        <img src={typeScriptImg} alt="CSS3 图标" width="100px" height="100px" />
    ),
    vue:() => (
        <img src={vueImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    reactimg:() => (
        <img src={reactImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    java:() => (
        <img src={javaImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    springBoot:() => (
        <img src={springBootImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    python:() => (
        <img src={pythonImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    mySQL:() => (
        <img src={mySQLImg} alt="CSS3 图标" width="100px" height="100px" />

    ),
    myAvater:() => (
        <img style={avaterStyles} src={LWYIMAGE} alt="CSS3 图标" width="200px" height="200px" />
    )

}
