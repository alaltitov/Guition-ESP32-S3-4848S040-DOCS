---
prev:
  text: 'Menu Buttons'
  link: '/guide/widgets/settings/menu'
next:
  text: 'Main Page'
  link: '/guide/widgets/home/main'
---

# Home Page

The home page `home.yaml` includes two separate files to separate functionality and improve code structure. Essentially, it's just a consolidation file.

## Architecture Overview

### **Package Structure:**
```yaml
packages:
  home: !include home_widget.yaml
  info: !include info_page.yaml
```

The home page consists of two main modules:
- **`home_widget.yaml`** - Main page
- **`info_page.yaml`** - Device information data

## Modular System

### **Separation of Concerns**
- Each file is responsible for specific functionality
- Logical separation of widget and information block
- Simplified code navigation

### **Maintainability**
- Changes in one module don't affect others
- Easier to find and fix issues
- Independent module development

### **Code Reusability**
- Modules can be used in other projects
- Component standardization

### **Scalability**
- Easy to add new modules
- Flexible architecture