# 2026 地震學課程學習歷程回顧

這是一個用於展示「地震學課程」整學期學習成果的靜態網站，包含了課程時間軸、作業成果、參訪活動、AI工具應用與學習反思。本專案專為部署至 GitHub Pages 所設計。

## 網站特色
- 🌗 **深淺色模式**：支援一鍵切換深色/淺色主題。
- 📅 **互動式時間軸**：完整記錄每週學習內容，並支援按類別篩選（理論、作業、參訪、AI工具）。
- 📚 **作業展示區**：以卡片形式呈現所有作業，支援搜尋功能。
- 🤖 **互動專區**：預留 Hugging Face Space 嵌入區，並包含地震學小測驗與隨機學習收穫按鈕。
- 📱 **響應式設計**：支援手機、平板與電腦完美瀏覽。

## 如何部署到 GitHub Pages
1. 在 GitHub 上建立一個新的 Repository，例如命名為 `2026_seismology_review`。
2. 將本資料夾內的所有檔案（`index.html`, `style.css`, `script.js`, `README.md` 以及 `images/` 資料夾）上傳或 Push 到該 Repository。
3. 進入該 Repository 的 **Settings**。
4. 在左側選單中找到 **Pages**。
5. 在 Build and deployment 的 Source 設定為 **Deploy from a branch**，並選擇 `main` (或 `master`) 分支的 `/ (root)`，點擊 Save。
6. 等待約 1-2 分鐘，頁面上方會顯示您的專屬 GitHub Pages 網址，點擊即可瀏覽！

## 圖片素材注意事項 (重要)
請在專案根目錄建立一個名為 `images` 的資料夾，並將您提供的以下 3 張圖片放入其中，即可在「參訪活動」區塊顯示圖片：
- `0921f6187a72c37e4581002a6b7be9f6.png` (對應：國家地震工程研究中心)
- `97c75d6b677abe233ffcd0a15df3de50.png` (對應：中油公司石油探索館)
- `3f917c8ee9a14f0b6540af9cc45c44e4.png` (對應：中央氣象署新北氣象站)

## Hugging Face Space 替換提醒
在 `index.html` 的「互動專區」中，有一個 `<div class="iframe-container">` 區塊預留了 Hugging Face Space 的位置。
- 請搜尋 `<!-- 註解：請將 src 替換為您的 Hugging Face Space 網址 -->`。
- 解開底下的 `<iframe>` 註解，並將 `src` 替換為您真實的 Space 網址（例如：`https://hf.space/embed/your-username/your-space-name`）。
- 也可以在網頁上點擊「複製 iframe 程式碼」按鈕來取得嵌入語法。
