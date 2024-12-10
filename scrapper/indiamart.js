import axios from "axios";

const indiaMartSrapper = async (searchQuery) => {
  const processIndiamartData = (data) => {
    const specifications = {};
    data.isq?.forEach((spec) => {
      const [key, value] = spec.split("==");
      if (key && value) {
        specifications[key.trim()] = value.trim();
      }
    });
    const findingName = (data) => {
      const make = data.title.split(" ")[0];
      const model = data.title.split(" ").slice(1).join(" ");
      return { make, model };
    };

    return {
      name: data.original_title || data.title,
      make: specifications["Brand"] || findingName(data).make || "Unknown Make",
      model:
        specifications["Model Name/Number"] ||
        findingName(data).model ||
        "Unknown Model",
      specifications: specifications,
      currentPrice: parseFloat(data.itemprice) || null,
      priceHistory: [
        {
          price: parseFloat(data.itemprice) || null,
          date: new Date(),
        },
      ],
      sources: [
        {
          sourceName: "Indiamart",
          link: data.url,
          lastUpdated: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  try {
    const response = await axios.get(
      `https://sih-webcrawler.vercel.app/api/indiamart/search?q=${searchQuery}`
    );
    const data = response.data;
    const foundResults = data.results;
    const products = [];
    foundResults.forEach((result) => {
      const processedProduct = processIndiamartData(result);
      products.push(processedProduct);
    });
    console.log(`Fetched ${products.length} products from IndiaMart`);
    return products;
  } catch (error) {
    console.error("Error fetching data from IndiaMart", error);
    return null;
  }
};

// indiaMartSrapper("Dell Latitude 3400").then((data) => {
//     console.log(data);
// });

export default indiaMartSrapper;
