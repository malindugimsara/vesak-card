import temple from "@/assets/temple.png";

/** Temple + palm tree silhouette anchored to the bottom of the page. */
const TempleSilhouette = () => (
  <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-0">
    <img
      src={temple}
      alt=""
      width={1920}
      height={512}
      loading="lazy"
      className="h-auto w-full opacity-70"
      style={{ filter: "brightness(0.45) saturate(0.6)" }}
    />
  </div>
);

export default TempleSilhouette;