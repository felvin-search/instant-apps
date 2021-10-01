import { useEffect } from "react";
import styled from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

//------------Styled Components-------------

const Stage = styled.canvas`
  display: block;
  max-width: 90vw;
  border-radius: 10px;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.8);
`;

const StageContainer = styled.div`
  display: block;
  width: 100%;
  margin: 20px 0;
`;

//=========================================

const NyanComponentRender = () => {
  useEffect(() => {
    gameLogic();
  }, []);

  return (
    <StageContainer>
      <Stage id="stage" width="800px" height="600px" />
    </StageContainer>
  );
};

//==============Game logic function==============

const colors = ["red", "orange", "yellow", "green", "blue", "indigo"];

const gameLogic = () => {
  const can = document.getElementById("stage");
  const ctx = can.getContext("2d");
  const wid = can.width;
  const hei = can.height;
  let player;
  let floor;
  let pillars;
  let gravity;
  let thrust;
  let running;
  let rainbows;
  let colider;
  let score;
  let gPat;
  let pPat;
  let trans;
  let termVel;
  let pillGap;
  let pillWid;
  let pillSpace;
  let speed;
  let stars;
  let high;
  const sprite = document.createElement("img");
  sprite.src = "https://i.stack.imgur.com/0prji.gif";
  sprite.onload = () => {
    sprite.style.height = 0;
    loop();
  };
  sprite.width = 34;
  sprite.height = 21;
  document.body.appendChild(sprite);
  const init = () => {
    high = localStorage.getItem("high") || 0;
    player = { x: (1 / 3) * wid, y: (2 / 5) * hei, r: 13, v: 0 };
    speed = 2.5;
    floor = (4 / 5) * hei;
    pillars = [];
    rainbows = [];
    stars = [];
    gravity = 0.25;
    thrust = gravity * -21;
    termVel = -thrust + 2;
    running = false;
    colider = false;
    score = 0;
    trans = 0;
    pillGap = 100;
    pillWid = 55;
    pillSpace = pillWid * 3;
    const createPattern = () => {
      const can = document.createElement("canvas");
      const ctx = can.getContext("2d");
      can.width = 60;
      can.height = 60;
      colors.forEach((color, i) => {
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(i * 10, 0);
        ctx.lineTo(i * 10 + 10, 0);
        ctx.lineTo(0, i * 10 + 10);
        ctx.lineTo(0, i * 10);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(i * 10, 60);
        ctx.lineTo(i * 10 + 10, 60);
        ctx.lineTo(60, i * 10 + 10);
        ctx.lineTo(60, i * 10);
        ctx.closePath();
        ctx.fill();
      });
      return can;
    };
    pPat = ctx.createPattern(createPattern(), "repeat");
    const createPattern2 = () => {
      const can = document.createElement("canvas");
      const ctx = can.getContext("2d");

      can.width = 32;
      can.height = 32;
      ctx.save();
      ctx.translate(16, 16);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = "#79CDCD";
      ctx.fillRect(-64, -64, 128, 128);
      ctx.fillStyle = "#528B8B";
      ctx.fillRect(-8, -64, 8, 128);
      ctx.fillRect(14.5, -64, 8, 128);
      ctx.restore();

      return can;
    };
    gPat = ctx.createPattern(createPattern2(), "repeat");
  };

  const render = () => {
    trans -= speed;
    rainbows = rainbows.filter((r) => {
      r.x -= speed;
      return r.x > -speed;
    });
    if (trans % speed === 0) {
      rainbows.push({
        x: player.x - 10,
        y: player.y - (((trans % 50) / 25) | 0) * 2 - 1,
      });
    }

    stars = stars.filter((s) => {
      trans % 10 || (s.r += 1);
      s.x -= speed;
      return s.x > -speed && s.r < 10;
    });
    if (trans % 20 === 0) {
      stars.push({
        x: Math.round(Math.random() * (wid - 50) + 100),
        y: Math.round(Math.random() * floor),
        r: 0,
      });
    }

    // backdrop
    ctx.fillStyle = "#082032";
    ctx.fillRect(0, 0, wid, hei);

    // stars
    ctx.fillStyle = "white";
    stars.forEach((s) => {
      ctx.fillRect(s.x, s.y - s.r - 2, 2, s.r / 2);
      ctx.fillRect(s.x - s.r - 2, s.y, s.r / 2, 2);
      ctx.fillRect(s.x, s.y + s.r + 2, 2, s.r / 2);
      ctx.fillRect(s.x + s.r + 2, s.y, s.r / 2, 2);

      ctx.fillRect(s.x + s.r, s.y + s.r, 2, 2);
      ctx.fillRect(s.x - s.r, s.y - s.r, 2, 2);
      ctx.fillRect(s.x + s.r, s.y - s.r, 2, 2);
      ctx.fillRect(s.x - s.r, s.y + s.r, 2, 2);
    });

    // ground

    ctx.fillStyle = "#406343";
    ctx.fillRect(0, floor, wid, hei - floor);

    ctx.save();
    ctx.translate(trans, 0);

    // pillars
    ctx.fillStyle = pPat;
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    for (const pill of pillars) {
      ctx.fillRect(pill.x, pill.y, pill.w, pill.h);
      ctx.strokeRect(pill.x, pill.y, pill.w, pill.h);
    }

    // stripe
    ctx.fillStyle = gPat;
    ctx.fillRect(-trans, floor + 2, wid, 15);
    ctx.restore();

    // rainbowwwwws
    rainbows.forEach((r) => {
      colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(r.x - speed, r.y - 9 + i * 3, speed + 1, 3);
      });
    });

    // player
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate((player.v * Math.PI) / 18);
    ctx.drawImage(sprite, -17, -10);
    ctx.restore();

    ctx.fillStyle = "#97FFFF";
    ctx.fillRect(0, floor, wid, 2);
    ctx.fillStyle = "#2F4F4F";
    ctx.fillRect(0, floor + 1, wid, 1);
    ctx.fillStyle = "#97FFFF";
    ctx.fillRect(0, floor + 17, wid, 2);
    ctx.fillStyle = "#2F4F4F";
    ctx.fillRect(0, floor + 17, wid, 1);

    // score
    ctx.font = "30px monospace";
    const hScore = "best:" + (score > high ? score : high);
    const sWid = ctx.measureText(hScore).width;
    const sY = 80;

    ctx.fillStyle = "white";
    ctx.fillText(score, 20, floor + sY);
    ctx.fillText(hScore, wid - sWid - 20, floor + sY);
  };

  const adjust = () => {
    if (trans % pillSpace === 0) {
      let h;
      pillars.push({
        x: -trans + wid,
        y: 0,
        w: pillWid,
        h: (h = Math.random() * (floor - 300) + 100),
      });

      pillars.push({
        x: -trans + wid,
        y: h + pillGap,
        w: pillWid,
        h: floor - h - pillGap,
      });
    }

    pillars = pillars.filter((pill) => -trans < pill.x + pill.w);

    player.v += gravity;
    if (player.v > termVel) {
      player.v = termVel;
    }
    player.y += player.v;

    if (player.y < player.r) {
      player.y = player.r;
      player.v = 0;
    }

    for (const i in pillars) {
      let pillIndex = i;
      const pill = pillars[pillIndex];
      if (
        pill.x + trans < player.x + player.r &&
        pill.x + pill.w + trans > player.x - player.r
      ) {
        if (
          player.y - player.r > pill.y &&
          player.y - player.r < pill.y + pill.h
        ) {
          colider = true;
          running = false;
          render();
          break;
        }
        if (
          player.y + player.r < pill.y + pill.h &&
          player.y + player.r > pill.y
        ) {
          colider = true;
          running = false;
          render();
          break;
        }
        if (!pill.passed && pillIndex % 2 == 1) {
          score += 1;
          pill.passed = true;
        }
      }
    }

    if (player.y + player.r - player.v > floor) {
      player.y = floor - player.r;
      running = false;
      colider = true;
      render();
    }
  };

  document.onmousedown = () => {
    if (running) {
      player.v = thrust;
    } else if (!colider) {
      running = true;
    } else {
      if (score > high) {
        localStorage.setItem("high", score);
      }
      init();
    }
  };
  init();
  function loop() {
    if (running) {
      adjust();
    }
    if (!colider) {
      render();
    }
    requestAnimationFrame(loop);
  }
};

//=========================================

const FlappyBird = {
  name: "FlappyBird",
  description: "A flappy bird game for when you are bored!",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: matchTriggerQueries([
    "i am bored",
    "flappy bird",
    "nyan cat flappy bird",
  ]),
  Component: NyanComponentRender,
};

export default FlappyBird;
