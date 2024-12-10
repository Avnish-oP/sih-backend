import webcrawler from "./crawler.js";

const queries = [
    "Best graphics card for gaming under 15000",
    "Affordable GTX 1650 graphics card for 1080p gaming",
    "High-end graphics cards with RTX 3080 for 4K gaming",
    "Best graphics card for video editing under 25000",
    "RTX 3060 graphics card for gaming and streaming",
    "Graphics card for machine learning and AI applications",
    "Best GPU for 3D rendering and animation under 30000",
    "Affordable GPU for mining with good performance",
    "Graphics cards with Ray tracing support for immersive gaming",
    "Best GPUs for video editing with hardware acceleration",
    "Best Intel i7 CPU for gaming under 25000",,
    "Affordable Ryzen 5 CPU for office work under 15000",
    "High-performance CPUs for video editing with overclocking support",
    "Best CPU for budget gaming PC under 10000",
    "Intel Xeon CPUs for workstations with 12 cores",
    "Ryzen 9 CPUs for high-end gaming and multitasking",
    "Best CPUs for machine learning and data science applications",
    "Dual-core CPUs for budget desktops under 5000",
    "Best CPUs for 4K video editing with fast rendering speed",
    "Best CPU brands for long-term performance in 2024",
    "Best 8GB DDR4 RAM for gaming under 3000",
    "Affordable 16GB RAM for multitasking in laptops",
    "32GB RAM modules for high-performance desktops",
    "Best RAM for video editing under 5000",
    "Corsair Vengeance 16GB RAM for gaming and overclocking",
    "Best RAM for laptop with 64GB capacity",
    "High-performance 8GB RAM for programming and software development",
    "Affordable DDR3 RAM for old desktop PC",
    "Best RAM for gaming PC with low latency and high speed",
    "RAM modules with heat sinks for overclocking support",
    ];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const executeQueries = async () => {
        for (const query of queries) {
            await webcrawler(query);
            console.log(`Executed query: ${query}`);
            await delay(180000); // 3 minutes delay
        }
    };

    executeQueries();

    export default executeQueries;