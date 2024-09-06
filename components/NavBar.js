import React, { useState } from "react";
import Popover from "react-popover";
import styles from "../styles/NavBar.module.css";

export default function NavBar({ onTabChange, activeTab }) {
  const [openPopover, setOpenPopover] = useState(null);

  const togglePopover = (brand) => {
    setOpenPopover(openPopover === brand ? null : brand);
  };

  const createPopoverContent = (items) => (
    <div className={styles.popover}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onTabChange(item.id);
            setOpenPopover(null);
          }}
          className={styles.popoverItem}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  const menuItems = [
    {
      label: "Accueil",
      id: "home",
      items: [],
    },
    {
      label: "Atari",
      id: "atari",
      items: [{ id: "atari-lynx", label: "Lynx" }],
    },
    {
      label: "Nintendo",
      id: "nintendo",
      items: [
        { id: "nintendo-nes", label: "NES" },
        { id: "nintendo-snes", label: "SNES" },
        { id: "nintendo-gameboy", label: "Game Boy" },
        { id: "nintendo-gbcolor", label: "GB Color" },
        { id: "nintendo-gba", label: "GBA" },
      ],
    },
    {
      label: "Sega",
      id: "sega",
      items: [
        { id: "sega-mastersystem", label: "Master System" },
        { id: "sega-megadrive", label: "Mega Drive" },
        { id: "sega-dreamcast", label: "Dreamcast" },
        { id: "sega-gamegear", label: "Game Gear" },
      ],
    },
    {
      label: "Sony",
      id: "sony",
      items: [{ id: "sony-playstation", label: "PlayStation" }],
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.ul}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.li}>
            <Popover
              isOpen={openPopover === item.id}
              onOuterAction={() => setOpenPopover(null)}
              body={
                item.items.length > 0 ? createPopoverContent(item.items) : null
              }
              place="below"
              tipSize={0.01}
            >
              <button
                className={`${styles.link} ${
                  activeTab.includes(item.id) ? styles.active : ""
                }`}
                onClick={() => {
                  if (item.items.length > 0) {
                    togglePopover(item.id);
                  } else {
                    onTabChange(item.id);
                  }
                }}
              >
                {item.label}
              </button>
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  );
}
