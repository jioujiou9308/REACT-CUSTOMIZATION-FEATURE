import React from "react";
import Image from "next/image";
const Index = () => {
  const w = 465;
  const h = 364;

  return (
    <div style={{ maxWidth: "1800px", backgroundColor: "yellow" }}>
      <Image
        src={
          "https://cdn.sanity.io/images/mqc7p4g4/production/5f636d7be122c9a77310044ba2f4eb6c4210d26c-930x728.png"
        }
        width={w}
        height={h}
        sizes="(max-width: 465px) 100vw, 100vw"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADZUlEQVQ4jXWUyU9bVxTG88eUIQEDZrSx/TwP2M+E+PnZZijgBINNKcEmrdKwYdFWCpWQ0lW6YFBajFEpC6QUFo0YxCIRK8SGQWkqFhQQAYlx+avejZIKBRb3LZ50f/c75zvnu3V5ecnFxQXn5+ecnp5yfHzM7u4u29vbrK6uMjc3x8TEBKOjo+KMj48zPT3NysoKGxsb7O3tiXsaQzu3NKD2Y2trS1zWLgwPDzMwMEAymSIaiyEHg/j9furq/AQCAcJhlWQyyeDgoHhsc3OTs7MzNJYAHh4eMjMzQyKRwOv1YTKbKdOXc/tOEV/k5ZOXX4BOV4JeX05paRl6vR5JkgQ8nc6wvLzMycnJ/8D9/X3GxsZQFAVJslJZVU3h7SLyCgoFrKhYhyTZ8Hh8mC0SNTUGPB4vDQ336O19yMLCwufAbDYrFMZijTTcCyFZ7ZTpK7hTpENXUobN7iAgB7HaHBiNtaIFqhohk+lncWnpKvDg4IBcLkd391fE4/fp6krR2NyCWbJRVl6BvrwSm92JLNfjcLowmcyiXFVVSWvAxWuAU1NT9PT00NGRoC+dIdGVxOn2YKg1Y7JI1PllGkIKdrtTKNSMikajZPpvAOZyUyRTKdra2un5upcHiU5cHq8o3eZw4vHV4ZeDH3poMCDLMtFojEz/o8+BWg81+9va4yhKmJYvW1EjMRxOtwBaJJuAur0+LJIVo9F4tYeL1wGzk3R0JolEm1AUVTiqGaABTWYJh8tNXUAW5mhjFQwGBTB9EzA7mSPV3UNLSxuKEhHqLBarUKQpDATvEo7EcHu8WK02wuEwTc3NN5f828QE9x90oqox6utD2O0uak0WDEaTcPuuotLY0obH5xczqalrbW3n0TffXgM8OODFi1+JxppwuX0CZqw1U1VtoLyiisqqGiS7E4fbKx6orjHg8/kJhcL09WVYWFy8Cjw6OuLlyz/pfdiHElY/zVutyUxFZRW6klKxhvkFhWIVi4t1H2ZRlnnyZIDXb96IPPgE1Bb73bt/ePXXK7LZSZ4//4WnT4d4/Pg7ERCRaAyXyyMgFrHDMvF4XITD7OwsOzs7Iq1E2mifjxGmyX5/+J7d3X95+/Zv1tbWWFpaZvr3P3j27Gd++P5HhoZ+YmRkhPn5edbX18UMf4RpwP8Au/M1Jepf9bcAAAAASUVORK5CYII="
        style={{ width: "100%", height: "auto" }}
      ></Image>
      <div>
        <Image
          src={
            "https://cdn.sanity.io/images/mqc7p4g4/production/5f636d7be122c9a77310044ba2f4eb6c4210d26c-930x728.png"
          }
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADZUlEQVQ4jXWUyU9bVxTG88eUIQEDZrSx/TwP2M+E+PnZZijgBINNKcEmrdKwYdFWCpWQ0lW6YFBajFEpC6QUFo0YxCIRK8SGQWkqFhQQAYlx+avejZIKBRb3LZ50f/c75zvnu3V5ecnFxQXn5+ecnp5yfHzM7u4u29vbrK6uMjc3x8TEBKOjo+KMj48zPT3NysoKGxsb7O3tiXsaQzu3NKD2Y2trS1zWLgwPDzMwMEAymSIaiyEHg/j9furq/AQCAcJhlWQyyeDgoHhsc3OTs7MzNJYAHh4eMjMzQyKRwOv1YTKbKdOXc/tOEV/k5ZOXX4BOV4JeX05paRl6vR5JkgQ8nc6wvLzMycnJ/8D9/X3GxsZQFAVJslJZVU3h7SLyCgoFrKhYhyTZ8Hh8mC0SNTUGPB4vDQ336O19yMLCwufAbDYrFMZijTTcCyFZ7ZTpK7hTpENXUobN7iAgB7HaHBiNtaIFqhohk+lncWnpKvDg4IBcLkd391fE4/fp6krR2NyCWbJRVl6BvrwSm92JLNfjcLowmcyiXFVVSWvAxWuAU1NT9PT00NGRoC+dIdGVxOn2YKg1Y7JI1PllGkIKdrtTKNSMikajZPpvAOZyUyRTKdra2un5upcHiU5cHq8o3eZw4vHV4ZeDH3poMCDLMtFojEz/o8+BWg81+9va4yhKmJYvW1EjMRxOtwBaJJuAur0+LJIVo9F4tYeL1wGzk3R0JolEm1AUVTiqGaABTWYJh8tNXUAW5mhjFQwGBTB9EzA7mSPV3UNLSxuKEhHqLBarUKQpDATvEo7EcHu8WK02wuEwTc3NN5f828QE9x90oqox6utD2O0uak0WDEaTcPuuotLY0obH5xczqalrbW3n0TffXgM8OODFi1+JxppwuX0CZqw1U1VtoLyiisqqGiS7E4fbKx6orjHg8/kJhcL09WVYWFy8Cjw6OuLlyz/pfdiHElY/zVutyUxFZRW6klKxhvkFhWIVi4t1H2ZRlnnyZIDXb96IPPgE1Bb73bt/ePXXK7LZSZ4//4WnT4d4/Pg7ERCRaAyXyyMgFrHDMvF4XITD7OwsOzs7Iq1E2mifjxGmyX5/+J7d3X95+/Zv1tbWWFpaZvr3P3j27Gd++P5HhoZ+YmRkhPn5edbX18UMf4RpwP8Au/M1Jepf9bcAAAAASUVORK5CYII="
        />
      </div>
    </div>
  );
};

export default Index;
