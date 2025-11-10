const eventContainer = document.getElementById("eventContainer");
const filterCategory = document.getElementById("filterCategory");

const renderEvents = (events) => {
  eventContainer.innerHTML = "";
  events.forEach(({ title, category, date }) => {
    const card = `
      <div class="col-md-4">
        <div class="card p-3">
          <h5>${title}</h5>
          <p>Category: ${category}</p>
          <p>Date: ${date}</p>
        </div>
      </div>`;
    eventContainer.innerHTML += card;
  });
};

const fetchEvents = async () => {
  try {
    const response = await fetch("./data/events.json");
    const events = await response.json();
    renderEvents(events);

    filterCategory.addEventListener("change", () => {
      const filtered =
        filterCategory.value === "all"
          ? events
          : events.filter(e => e.category === filterCategory.value);
      renderEvents(filtered);
    });
  } catch (error) {
    console.error("Error loading events:", error);
  }
};

fetchEvents();