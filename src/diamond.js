import React from "react";
import { useGLTF } from "@react-three/drei";

export function Diamond(props) {
    const { nodes, materials } = useGLTF("scene.glb");
    return (
        <group {...props} dispose={null} scale={10}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes?.pCone1_DiamondOutside_0.geometry}
                        material={materials?.DiamondOutside}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("scene.glb");