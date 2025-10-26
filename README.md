# CopyMyDate

![CopyMyDate Logo](icons/icon128.png)

A powerful Chrome extension to copy the current date and time in 30+ different formats with just one click.

## ✨ Features

- 🎯 **30+ Date Formats** - From simple MM/dd/yyyy to complex ISO formats
- 🔍 **Smart Search** - Quickly find the format you need
- ⚡ **Live Updates** - See the current time update every second
- 📋 **One-Click Copy** - Copy to clipboard instantly
- ✅ **Visual Feedback** - Know exactly when your date is copied
- ⌨️ **Keyboard Shortcut** - Use `Ctrl+Shift+C` (or `Cmd+Shift+C` on Mac) to copy quickly
- 💾 **Remembers Your Choice** - Your selected format is saved automatically
- 🎨 **Beautiful UI** - Modern, clean design with smooth animations
- 🚀 **Lightweight** - No external dependencies, fast and efficient

## 📦 Installation

### From Source

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `CopyMyDate` folder
6. The extension is now installed! Click the icon to start using it

### From Chrome Web Store

*Coming soon!*

## 🎯 Available Formats

### Date Formats
- `MM/dd/yyyy` → 10/26/2025
- `dd/MM/yyyy` → 26/10/2025
- `yyyy-MM-dd` → 2025-10-26
- `yyyy/MM/dd` → 2025/10/26
- `dd-MM-yyyy` → 26-10-2025
- `MM-dd-yyyy` → 10-26-2025
- `dd.MM.yyyy` → 26.10.2025
- `yyyy.MM.dd` → 2025.10.26
- `yyyyMMdd` → 20251026
- `ddMMyyyy` → 26102025
- `MM/dd/yy` → 10/26/25
- `dd/MM/yy` → 26/10/25
- `yy-MM-dd` → 25-10-26

### Long Date Formats
- `MMMM dd, yyyy` → October 26, 2025
- `MMM dd, yyyy` → Oct 26, 2025
- `dd MMMM yyyy` → 26 October 2025
- `dd MMM yyyy` → 26 Oct 2025
- `dd-MMM-yyyy` → 26-Oct-2025
- `EEEE, MMMM dd, yyyy` → Sunday, October 26, 2025
- `EEE, MMM dd, yyyy` → Sun, Oct 26, 2025

### Time Formats
- `HH:mm:ss` → 14:30:45
- `hh:mm:ss a` → 02:30:45 PM
- `HH:mm` → 14:30
- `hh:mm a` → 02:30 PM

### Date & Time Formats
- `yyyy-MM-dd HH:mm:ss` → 2025-10-26 14:30:45
- `dd/MM/yyyy HH:mm:ss` → 26/10/2025 14:30:45
- `MM/dd/yyyy hh:mm:ss a` → 10/26/2025 02:30:45 PM
- `yyyy-MM-dd'T'HH:mm:ss` → 2025-10-26T14:30:45 (ISO 8601)
- `MMMM dd, yyyy hh:mm a` → October 26, 2025 02:30 PM
- `MMM dd, yyyy HH:mm` → Oct 26, 2025 14:30
- `MMMM dd, yyyy HH:mm:ss` → October 26, 2025 14:30:45
- `dd/MM/yyyy hh:mm a` → 26/10/2025 02:30 PM

## 🚀 Usage

1. Click the **CopyMyDate** icon in your Chrome toolbar
2. Choose your preferred date format from the list
3. Click the **Copy** button (or use the keyboard shortcut)
4. Paste anywhere you need!

### Keyboard Shortcuts

- **Copy Date**: `Ctrl+Shift+C` (Windows/Linux) or `Cmd+Shift+C` (Mac)

## 🛠️ Development

### Project Structure

```
CopyMyDate/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI structure
├── popup.css             # Styling
├── popup.js              # Functionality
├── README.md             # Documentation
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Building from Source

1. Clone the repository:
```bash
git clone https://github.com/yourusername/copymydate.git
cd copymydate
```

2. Make your changes to the source files

3. Load the extension in Chrome (see Installation section)

### Adding New Formats

To add a new date format, edit the `DATE_FORMATS` array in `popup.js`:

```javascript
const DATE_FORMATS = [
    { label: "Your Format", value: "yyyy-MM-dd", example: "2025-10-26" },
    // Add your format here
];
```

Format tokens:
- `yyyy` - 4-digit year (2025)
- `yy` - 2-digit year (25)
- `MM` - 2-digit month (10)
- `MMM` - Short month name (Oct)
- `MMMM` - Full month name (October)
- `dd` - 2-digit day (26)
- `EEE` - Short day name (Sun)
- `EEEE` - Full day name (Sunday)
- `HH` - 24-hour format (14)
- `hh` - 12-hour format (02)
- `mm` - Minutes (30)
- `ss` - Seconds (45)
- `a` - AM/PM

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [Lucide Icons](https://lucide.dev/)
- Font from [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

## 📧 Contact

For questions, suggestions, or bug reports, please open an issue on GitHub.

## 🌟 Support

If you find this extension helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

**Made with ❤️ for developers and productivity enthusiasts**

Version: 2.0.0 | Last Updated: October 2025
