# Image Captioning AI
**Live Demo**: https://image-captioning-ai.netlify.app  

---

### Project Overview
**Image Captioning AI** is a full-stack deep learning application that automatically generates natural English captions for any uploaded image in real time.

Trained on the **Flickr30k dataset** using **ResNet50 + LSTM with merge architecture**, this project combines cutting-edge computer vision and natural language processing to describe images like a human would.

---

### Features
- Real-time image captioning with **Beam Search** and **Greedy** decoding
- Beautiful, responsive React + Tailwind CSS frontend
- FastAPI backend deployed on Hugging Face Spaces
- On-the-fly ResNet50 feature extraction
- Fully open-source and deployable

---

### Live Links
| Component              | URL                                                                 |
|------------------------|----------------------------------------------------------------------|
| Web App (Frontend)     | https://image-captioning-ai.netlify.app                              |
| API Backend            | https://salehmangrio-image-captioning-api.hf.space                  |
| API Docs (Swagger)     | https://salehmangrio-image-captioning-api.hf.space/docs             |

---

### Tech Stack
| Layer              | Technology                                 |
|--------------------|---------------------------------------------|
| Frontend           | React.js + Tailwind CSS                     |
| Hosting (Frontend) | Netlify                                     |
| Backend            | FastAPI + TensorFlow/Keras                  |
| Model              | ResNet50 (CNN) + LSTM (Decoder)             |
| Hosting (Backend)  | Hugging Face Spaces                         |
| Dataset            | Flickr30k                                   |
| Inference Methods  | Greedy & Beam Search (k=3)                  |

---

### Model Architecture
Image → ResNet50 → 2048-dim vector → Dense → RepeatVector <br/>
Caption Input → Embedding → LSTM → Add with image features → LSTM → Softmax

- Max caption length: **85**
- Vocabulary size: ~8500+
- Trained with teacher forcing and categorical crossentropy

---

### How to Use
1. Visit: https://image-captioning-ai.netlify.app
2. Upload any photo (JPG/PNG)
3. Choose **Beam Search** (best quality) or **Greedy** (faster)
4. Click **"Generate Caption"**
5. Get a fluent, accurate description instantly!

---

### Developers
- **Saleh Mangrio** – Full-stack ML Engineer  
  GitHub: https://github.com/SalehMangrio  
  Hugging Face: https://huggingface.co/Salehmangrio

- **Kelash Kumar** – ML Engineer & UI Designer

---

### Acknowledgments
- Flickr30k Dataset
- TensorFlow & Keras Team
- Hugging Face & Netlify for free hosting
---
