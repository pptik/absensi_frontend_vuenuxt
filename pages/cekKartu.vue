/* eslint-enable */
<template>
 <section class="container">
  <div >
    <div v-if="loading" class="loading">
      <div class="spinner">
        <img
          src="~/assets/VidyaRossa Putih-01.png"
          class="card-img-top img-fluid"
          alt=""
          style="
            margin: auto;
            display: block;
            width: 100px;
            height: 100px;
            margin-top: 20px;
            align-content: center;
          "
        />
      </div>
    </div>
    <div v-else class="container">
      <button class="reload-button" @click="reloadData">Reload</button>
      <br />
      <div class="row">
        <div v-for="(image, index) in imageData" :key="index" class="col-md-4">
         <div class="col">
          <div class="card mb-4" border="warning">
            <img
              v-if="image.value"
              :src="image.value"
              class="card-img-top img-fluid"
              :alt="image.value"
              style="
                margin: auto;
                display: block;
                width: 430px;
                height: 350px;
                margin-top: 20px;
                align-content: center;
                border-radius: 10px;
              "
              @error="handleImageError(index)"
            />
            <div v-else class="placeholder-image"></div>
            <div class="card-body">
              <h5 class="card-title">{{ image.user.NAME }}</h5>
              <h5 class="card-title">
                ID RFID: {{ image.rfid_convert }}
              </h5>
              <p class="card-time">WAKTU: {{ image.datetime }}</p>
              <p class="card-time">{{ image.company }}</p>
               <h3 class="card-title">
                ID MESIN: {{ image.guid_device }}
              </h3>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="pagination d-flex align-items-center">
        <Container>
          <ButtonGroup vertical>
            <Row class="justify-content-center">
              <Col>
                <Button
                  @click="paginate(currentPage - 1)"
                  :disabled="currentPage === 1"
                >
                  Sebelumnya
                </Button>
              </Col>
              <Col v-for="(num, index) in totalPages" :key="index">
                <Button @click="paginate(num)" :active="currentPage === num">
                  {{ num }}
                </Button>
              </Col>
              <Col>
                <Button
                  @click="paginate(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                >
                  Berikutnya
                </Button>
              </Col>
            </Row>
          </ButtonGroup>
        </Container>
      </div>
      <div class="footer">
        <p>&copy; 2023 PPTIK</p>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      imageData: [],
      currentPage: 1,
      imagesPerPage: 6,
      totalPages: [],
      loading: true
    }
  },
  mounted () {
    this.fetchData()
    this.intervalId = setInterval(this.fetchData, 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  /* eslint-disable */
  methods: {
    fetchData () {
      const data = {
        page: this.currentPage,
        limit: this.imagesPerPage,
        company: 'DKM MANUNGGAL'
      }
    axios
        .post('https://rfid-cam.pptik.id/api/api.v1/camera/get-company',data)
        .then((response) => {
          this.loading = false
          this.imageData = response.data.history
          this.totalPages = response.data.totalPages
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          this.loading = true
        })
    },
    /* eslint-enable */
    paginate (pageNumber) {
      this.loading = true
      this.currentPage = pageNumber
      const data = {
        page: pageNumber,
        limit: this.imagesPerPage,
        company: 'DKM MANUNGGAL'
      }
      setTimeout(() => {
        this.fetchData(data)
      }, 1000)
    },
    /* eslint-disable */
    copyToClipboar (text, index) {
    const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      // Update the copied property for the specific image
      const updatedImageData = [...this.imageData];
      updatedImageData[index].unit = true;
      this.imageData = updatedImageData;

      // Reset the 'copied' state after a few seconds
      setTimeout(() => {
        updatedImageData[index].unit = false;
        this.imageData = updatedImageData;
      }, 2000);
    },
      /* eslint-enable */
    handleImageError (index) {
      this.$set(
        this.imageData,
        index,
        Object.assign({}, this.imageData[index], {
          value: 'https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg'
        })
      )
    },
    reloadData () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
/* CSS Kustom */
.container {
  max-width: 700px;
  margin: 0 auto;
}

.list-group-item {
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
}

/* imageList.css */
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  max-width: 80%;
  height: auto;
}

.card-title {
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: center;
}

.card-time {
  font-size: 1rem;
  color: #777;
  text-align: center;
}

.card-text {
  font-size: 1rem;
  color: #777;
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #186f65;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:hover {
  background-color: #0056b3;
}

/* Loading indicator styles */
.loading {
  text-align: center;
  font-size: 24px;
  color: #007bff; /* Blue color */
  margin: 20px 0;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #186f65;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 3s linear infinite;

  /* Center the spinner horizontally and vertically */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Active pagination button style */
.pagination button.active {
  background-color: #b5cb99; /* Change the color of the active button */
  color: #fff; /* Text color for the active button */
}

/* Footer styles */
.footer {
  background-color: #fff;
  color: #186f65;
  text-align: center;
  padding: 10px;
  margin: top 50px;
}

/* Add flexbox to push the footer to the bottom */
.main-content {
  flex: 1;
}

/* Button styles */
.copy-button {
  background-color: #186f65;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 14px;
}

.copy-button:hover {
  background-color: #0056b3;
}

/* Add a style for the 'copied' state */
.copy-button.copied {
  background-color: #28a745; /* Green color for success */
  cursor: default;
}

/* Style the button text when it's in the 'copied' state */
.copy-button.copied:after {
  content: '';
}

/* Button styles */
.reload-button {
  background-color: #186f65;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 1px;
  margin-bottom: 10px;
  justify-content: right;
  align-content: right;
}

.reload-button:hover {
  background-color: #28a745;
}

/* styles.css */
.dive-center {
  /* border: 1px solid #ddd; */
  padding: 20px;
  margin: 20px;
  text-align: center;
  max-width: 700px;
  align-content: center;
  justify-content: left;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  background-color: #f9f9f9;
}

.center-image {
  max-width: 100%;
  border-radius: 5px;
}

h2 {
  font-size: 1.5rem;
  margin-top: 10px;
}

p {
  font-size: 1rem;
  margin-top: 10px;
}

strong {
  font-weight: bold;
}
</style>