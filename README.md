# \# 🎓 University Finder App

# 

# A cross-platform mobile application for iOS \& Android built with React Native. This app allows users to browse a global list of universities, filter them by country, view their websites, and save their favorites. All user preferences and favorites are stored locally, ensuring they persist across app sessions.

# 

# \## 📸 Screenshots \& Demo

# 

# \*(Here you should insert your screenshots or a GIF of the app in action. This is the most important part of the README!)\*

# 

# | Browse Screen | Favorites Screen | WebView Modal |

# | :-----------: | :--------------: | :-----------: |

# | <img src="URL\_TO\_YOUR\_BROWSE\_SCREENSHOT.png" width="250"> | <img src="URL\_TO\_YOUR\_FAVORITES\_SCREENSHOT.png" width="250"> | <img src="URL\_TO\_YOUR\_MODAL\_SCREENSHOT.png" width="250"> |

# 

# 

# \## ✨ Features

# 

# \- \[x] \*\*Bottom Tab Navigation:\*\* Two main tabs for "Browse" and "Favorites".

# \- \[x] \*\*University Search:\*\* Fetches data from the \[Universities API](http://universities.hipolabs.com/search).

# \- \[x] \*\*Filter by Country:\*\* A dropdown menu to dynamically filter universities by country.

# \- \[x] \*\*Infinite Scroll:\*\* Efficiently loads more universities as the user scrolls down the list.

# \- \[x] \*\*Favorite System:\*\* Users can add or remove universities from a persistent favorites list.

# \- \[x] \*\*Persistent Storage:\*\* User's selected country filter and favorited universities are saved locally using `AsyncStorage`.

# \- \[x] \*\*In-App WebView:\*\* Clicking a university opens its homepage in a modal with a webview.

# \- \[x] \*\*Loading \& Error States:\*\* Displays a loading indicator while fetching data and shows a friendly error message on API failure.

# \- \[x] \*\*Cross-Platform:\*\* A single codebase that runs seamlessly on both iOS and Android devices.

# \- \[x] \*\*Modern Theming:\*\* A clean and professional UI with a consistent theme.

# 

# \## 🛠️ Tech Stack \& Libraries

# 

# \- \*\*Core:\*\* React Native

# \- \*\*Navigation:\*\* React Navigation (Bottom Tab Navigator)

# \- \*\*API Requests:\*\* Axios

# \- \*\*Local Storage:\*\* AsyncStorage

# \- \*\*UI Components:\*\* React Native WebView, React Native Picker

# \- \*\*Language:\*\* JavaScript (ES6+)

# 

# \## 🚀 Getting Started

# 

# Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

# 

# \### Prerequisites

# 

# \- \[Node.js](https://nodejs.org/) (`>=16.x`) and npm

# \- \[Watchman](https://facebook.github.io/watchman/) (for macOS)

# \- A Java Development Kit (JDK)

# \- \[Android Studio](https://developer.android.com/studio) (for Android development)

# \- \[Xcode](https://developer.apple.com/xcode/) (for iOS development on macOS)

# 

# For detailed instructions, follow the official React Native environment setup guide for \*\*React Native CLI Quickstart\*\*: \[https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

# 

# \### Installation

# 

# 1\.  \*\*Clone the repository:\*\*

# &nbsp;   ```sh

# &nbsp;   git clone https://github.com/your-username/UniversityFinderApp.git

# &nbsp;   cd UniversityFinderApp

# &nbsp;   ```

# 2\.  \*\*Install NPM packages:\*\*

# &nbsp;   ```sh

# &nbsp;   npm install

# &nbsp;   ```

# 3\.  \*\*Install iOS dependencies (for macOS):\*\*

# &nbsp;   ```sh

# &nbsp;   cd ios \&\& pod install \&\& cd ..

# &nbsp;   ```

# 

# \### Running the Application

# 

# 1\.  \*\*Start the Metro bundler:\*\*

# &nbsp;   ```sh

# &nbsp;   npx react-native start

# &nbsp;   ```

# 2\.  \*\*Run on a device or emulator:\*\*

# 

# &nbsp;   - \*\*For iOS (macOS only):\*\*

# &nbsp;     ```sh

# &nbsp;     npx react-native run-ios

# &nbsp;     ```

# &nbsp;   - \*\*For Android:\*\*

# &nbsp;     ```sh

# &nbsp;     npx react-native run-android

# &nbsp;     ```

# 

# \## 📁 Project Structure

# 

# The project is structured to be scalable and maintainable.

# 

# ```

# UniversityFinder/

# ├── src/

# │   ├── api/          # API request logic (Axios)

# │   ├── components/   # Reusable components (e.g., UniversityCard, Loader)

# │   ├── navigation/   # Navigation setup (React Navigation)

# │   ├── screens/      # Main screens (BrowseScreen, FavoritesScreen)

# │   ├── storage/      # AsyncStorage helper functions

# │   └── theme/        # Color palette and styling constants

# ├── App.js            # Main application entry point

# └── ...

# ```

# 

# \## 📄 License

# 

# This project is licensed under the MIT License - see the \[LICENSE.md](LICENSE.md) file for details.

