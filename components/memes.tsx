"use client"

// Meme images from public/images
const memeImages = [
  "/images/meme1.jpg",
  "/images/meme2.jpg", 
  "/images/meme3.jpg",
  "/images/meme4.jpg",
  "/images/meme5.jpg",
  "/images/meme6.jpg",
  "/images/meme7.jpg",
  "/images/meme8.jpg",
  "/images/meme9.jpg",
]

export default function Memes() {
  return (
    <section
      id="memes"
      className="flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-memes.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#87CEEB",
        minHeight: 'auto',
        height: 'fit-content',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
     
      <div className="max-w-4xl mx-auto w-full relative z-10 pt-[8vh]">
        <div className="text-center mb-[6vh]">
          <img
            src="/images/title-memes.png"
            alt="PEANIE MEMES"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>
        
        {/* Subtitle */}
        <div className="text-center mb-[8vh]">
          <h2 className="text-white text-2xl md:text-3xl font-medium">Some Community Creations</h2>
        </div>

        {/* 3x3 Meme Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-[8vh]">
          {memeImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-red-500 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Meme ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                onLoad={(e) => {
                  // Ensure image is visible when loaded successfully
                  e.currentTarget.style.display = 'block';
                }}
                onError={(e) => {
                  // Hide broken image and show red background
                  e.currentTarget.style.display = 'none';
                  console.log(`Failed to load: ${image}`);
                }}
                style={{ display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
