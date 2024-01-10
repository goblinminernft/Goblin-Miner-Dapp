import { useContract } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Gameplay.module.css";
import Image from "next/image";
import { TOOLS_ADDRESS } from "../const/addresses";

interface GameplayAnimationProps {
    equippedTools: boolean;
}

const BlueCrystal = (
  <div className={styles.slide}>
    <Image src="/blue_crystal.gif" height="48" width="48" alt="gold-gem" />
  </div>
);

const GameplayAnimation: React.FC<GameplayAnimationProps> = ({ equippedTools }) => {
  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        {equippedTools ? (
          <>
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            {BlueCrystal}
            
          </> 
        ) : (
          <div className={styles.noToolsMessage}>I need a Goblin Tool!</div>
        )}
      </div>
    </div>
  );
};

export default GameplayAnimation;
