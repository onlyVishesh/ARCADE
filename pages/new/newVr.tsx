import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, GroupProps } from "@react-three/fiber";
import { VRButton, XR } from "@react-three/xr";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { fade } from "../../animations";
import de from "../../locales/de/translationDe.json";
import en from "../../locales/en/translationEn.json";
import fr from "../../locales/fr/translationFr.json";
import hi from "../../locales/hi/translationHi.json";
import ja from "../../locales/ja/translationJa.json";
import ru from "../../locales/ru/translationRu.json";

type ModelProps = GroupProps & {
  isAnimationPlaying: boolean;
  toggleAnimation: () => void;
};

const locales: { [key: string]: any } = { en, de, fr, hi, ja, ru };

type GLTFResult = GLTF & {
  nodes: {
    triangles_0008: THREE.Mesh;
    triangles_0008_1: THREE.Mesh;
    Bonding_orbital: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    ["1s_static_R"]: THREE.Mesh;
    ["1s_static_L"]: THREE.Mesh;
    ["1s_for_bonding_R"]: THREE.Mesh;
    ["1s_for_bonding_L"]: THREE.Mesh;
    ["1s_for_antibonding_R"]: THREE.Mesh;
    ["1s_for_antibonding_L"]: THREE.Mesh;
    Text005: THREE.Mesh;
    Text005_1: THREE.Mesh;
    Text005_2: THREE.Mesh;
  };
  materials: {
    grey: THREE.MeshStandardMaterial;
    blue: THREE.MeshStandardMaterial;
    red: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
  };
};

function Model({ isAnimationPlaying, toggleAnimation, ...props }: ModelProps) {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials, animations } = (useGLTF(
    "/chemistry/molecular-orbital-diagram-h2/MO_diagramH2e.glb"
  ) as unknown) as GLTFResult;
  const { actions } = useAnimations<THREE.AnimationClip>(animations, group);

  useEffect(() => {
    if (!!actions.Animation) {
      if (isAnimationPlaying) {
        actions.Animation.play();
        actions.Animation.paused = false;
      } else {
        actions.Animation.paused = true;
        // actions['Animation'].stop();
      }
    }
  }, [isAnimationPlaying, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="1s_antibonding_orbitals"
          position={[0.015, 7.375, -0.618]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <group name="antibonding_orbital">
            <mesh
              name="triangles_0008"
              geometry={nodes.triangles_0008.geometry}
              material={materials.red}
            />
            <mesh
              name="triangles_0008_1"
              geometry={nodes.triangles_0008_1.geometry}
              material={materials.blue}
            />
          </group>
        </group>
        <group
          name="1s_bonding_orbitals"
          position={[0.015, 1.375, -0.618]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            name="Bonding_orbital"
            geometry={nodes.Bonding_orbital.geometry}
            material={materials.red}
          />
        </group>
        <group
          name="MO_diagram_structure"
          position={[0.027, 2.873, -0.59]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 0.1, 1]}
        >
          <mesh
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={materials.grey}
          />
          <mesh
            name="Cube002_1"
            geometry={nodes.Cube002_1.geometry}
            material={materials.blue}
          />
          <mesh
            name="Cube002_2"
            geometry={nodes.Cube002_2.geometry}
            material={materials.red}
          />
        </group>
        <mesh
          name="1s_static_R"
          geometry={nodes["1s_static_R"].geometry}
          material={materials.red}
          position={[9.556, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.93}
        />
        <mesh
          name="1s_static_L"
          geometry={nodes["1s_static_L"].geometry}
          material={materials.red}
          position={[-9.485, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.887}
        />
        <mesh
          name="1s_for_bonding_R"
          geometry={nodes["1s_for_bonding_R"].geometry}
          material={materials.red}
          position={[9.556, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.93}
        />
        <mesh
          name="1s_for_bonding_L"
          geometry={nodes["1s_for_bonding_L"].geometry}
          material={materials.red}
          position={[-9.485, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.93}
        />
        <mesh
          name="1s_for_antibonding_R"
          geometry={nodes["1s_for_antibonding_R"].geometry}
          material={materials.red}
          position={[9.556, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.93}
        />
        <mesh
          name="1s_for_antibonding_L"
          geometry={nodes["1s_for_antibonding_L"].geometry}
          material={materials.blue}
          position={[-9.485, 4.373, -0.618]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.93}
        />
        <group
          name="Text"
          position={[1.519, 4.531, -2.152]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Text005"
            geometry={nodes.Text005.geometry}
            material={materials.blue}
          />
          <mesh
            name="Text005_1"
            geometry={nodes.Text005_1.geometry}
            material={materials.Black}
          />
          <mesh
            name="Text005_2"
            geometry={nodes.Text005_2.geometry}
            material={materials.red}
          />
        </group>
      </group>
    </group>
  );
}

export default function Moh2() {
  const router = useRouter();
  const { locale } = router;
  const t = locale ? locales[locale] : locales["en"];
  const [isAnimationPlaying, setAnimationPlaying] = useState(false);

  const toggleAnimation = () => {
    setAnimationPlaying((prevState) => !prevState);
  };

  return (
    <div className="pt-20 md:pt-24 text-white">
      <Link href="/subject/chemistry" passHref>
        <button
          className="left-2 md:px-8 px-6 mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row text-white align-middle text-xl lowercase"
          type="button"
          aria-hidden="false"
          aria-label="button"
        >
          <BiArrowBack className="h-4 mt-2" aria-hidden="false" />
          {t.goBack}
        </button>
      </Link>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        className="grid w-full py-10 place-items-center"
      >
        <h1 className="pb-2 text-3xl font-semibold tracking-wide lg:text-6xl">
          {t.MOH2}
        </h1>
        <div className="inline-flex h-1 bg-purple-600 rounded-full w-72"></div>
      </motion.div>

      <div className="md:pr-15 md:px-16 px-4 pr-1">
        <div className="w-full h-128 px-4 outline-none cursor-grab md:col-span-2 lg:block relative">
          <div>
            <VRButton />
          </div>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4], fov: 50 }}
          >
            <XR>
              <ambientLight intensity={0.4} />
              <Suspense fallback={null}>
                <Model
                  isAnimationPlaying={isAnimationPlaying}
                  toggleAnimation={toggleAnimation}
                  scale={0.1}
                />
                {/* <Environment preset="city" /> */}
              </Suspense>
              {/* <OrbitControls autoRotate addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} /> */}
              <OrbitControls
                addEventListener={undefined}
                hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined}
              />
            </XR>
          </Canvas>
          <button
            onClick={toggleAnimation}
            className="absolute top-0 right-2 m-2 bg-secondary px-2 py-1 rounded-md flex flex-row"
          >
            {isAnimationPlaying ? `${t.pauseAnimation}` : `${t.playAnimation}`}
            {isAnimationPlaying ? (
              <BsFillPauseFill className="ml-2 mt-1" />
            ) : (
              <BsFillPlayFill className="ml-2 mt-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
