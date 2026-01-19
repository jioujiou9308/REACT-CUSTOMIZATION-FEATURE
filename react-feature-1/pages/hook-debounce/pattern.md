# React Hook 中實現 Debounce 的兩種模式比較

## 概述

在 React Hook 中實現 debounce 功能有兩種主要模式：

1. **模式 1**：直接傳入資料，使用 `useDebounce` 處理 dependency
2. **模式 2**：回傳函數，在函數內部管理 timer

兩種模式都能實現相同功能，但適用場景和實現方式不同。

---

## 模式 1：使用 useDebounce 處理 Dependency

### 實現方式

```typescript
function useAddressValidation(addressData) {
  const [result, setResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isPOBox, setIsPOBox] = useState(false);
  const [error, setError] = useState(null);

  // 1️⃣ 使用 useDebounce 延遲資料變化
  const debouncedAddressData = useDebounce(addressData, 800);

  // 2️⃣ 手動清除功能
  const clearValidation = useCallback(() => {
    setSuggestions([]);
    setError(null);
    setIsPOBox(false);
  }, []);

  // 3️⃣ 清除特定欄位建議
  const clearSuggestionForField = useCallback((field) => {
    setSuggestions((prev) => prev.filter((s) => s.field !== field));
  }, []);

  // 4️⃣ 取得特定欄位建議
  const getSuggestionForField = useCallback(
    (field) => {
      return suggestions.find((s) => s.field === field) || null;
    },
    [suggestions],
  );

  // 5️⃣ 自動驗證（當 debounced 資料改變時）
  useEffect(() => {
    if (!debouncedAddressData) return;

    setIsValidating(true);
    setError(null);

    httpService
      .post("/api/validate-address", debouncedAddressData)
      .then((data) => {
        setIsPOBox(data.isPOBox);
        setSuggestions(data.suggestions);
        setResult(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsValidating(false));
  }, [debouncedAddressData]); // dependency 是 debounced 版本

  return {
    result,
    isValidating,
    suggestions,
    isPOBox,
    error,
    clearValidation,
    clearSuggestionForField,
    getSuggestionForField,
  };
}
```

### 使用方式

```typescript
// 在組件中使用
const address = watch("address"); // 使用者每打一個字就改變
const { result, isValidating, isPOBox, suggestions, clearValidation } = useAddressValidation(address);

// 資料流：
// 使用者輸入 "123 Main St"
// → address 改變 10 次
// → debouncedAddressData 只在 800ms 後改變 1 次
// → useEffect 只觸發 1 次 API 呼叫 ✅
```

### 跳過驗證的實現（需要額外邏輯）

```typescript
const [skipValidation, setSkipValidation] = useState(false);
const addressData = skipValidation ? null : watch("address");
const { result } = useAddressValidation(addressData);

// Google Autocomplete 選擇時
onAutocompleteSelect(() => {
  setSkipValidation(true); // 需要額外 flag
  setValue("address", "...");
  setTimeout(() => setSkipValidation(false), 100);
});
```

---

## 模式 2：回傳函數，內部管理 Timer

### 實現方式

```typescript
function useAddressValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [isPOBox, setIsPOBox] = useState(false);

  const debounceTimerRef = useRef(null);
  const lastValidationRef = useRef("");

  // 清除所有驗證結果
  const clearValidation = useCallback(() => {
    setSuggestions([]);
    setError(null);
    setIsPOBox(false);
  }, []);

  // 清除特定欄位建議
  const clearSuggestionForField = useCallback((field) => {
    setSuggestions((prev) => prev.filter((s) => s.field !== field));
  }, []);

  // 主要驗證函數（外部主動呼叫）
  const validateAddress = useCallback((addressData, debounceMs = 500) => {
    // 清除之前的 timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 建立唯一 key 避免重複驗證
    const validationKey = JSON.stringify(addressData);
    if (validationKey === lastValidationRef.current) {
      console.log("⏭️ 跳過驗證 - 與上次相同");
      return;
    }

    // 設定新的 timer
    debounceTimerRef.current = setTimeout(async () => {
      try {
        setIsValidating(true);
        setError(null);
        setIsPOBox(false);

        const { data } = await httpService.post("/api/validate-address", addressData);

        lastValidationRef.current = validationKey;

        if (data.isPOBox) {
          setIsPOBox(true);
          setError("We cannot ship to PO Box addresses.");
          return;
        }

        if (data.errorMessage) {
          setError(data.errorMessage);
          return;
        }

        // 處理建議...
        setSuggestions(newSuggestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsValidating(false);
      }
    }, debounceMs);
  }, []);

  // 取得特定欄位建議
  const getSuggestionForField = useCallback(
    (field) => {
      return suggestions.find((s) => s.field === field) || null;
    },
    [suggestions],
  );

  return {
    isValidating,
    suggestions,
    error,
    isPOBox,
    validateAddress, // 函數（外部呼叫）
    clearValidation,
    clearSuggestionForField,
    getSuggestionForField,
  };
}
```

### 使用方式

```typescript
// 在組件中使用
const { validateAddress, isPOBox, suggestions, clearValidation } = useAddressValidation();

// 在 useEffect 中主動呼叫
useEffect(() => {
  if (!address || !city || !zipCode) {
    clearValidation();
    return;
  }

  // 主動呼叫驗證，可動態調整 debounce 時間
  validateAddress(
    {
      street_number: streetNumber,
      route: route,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
    },
    800,
  ); // 800ms debounce
}, [address, city, state, zipCode]);

// 資料流：
// 使用者輸入 "123 Main St"
// → address 改變 10 次
// → useEffect 觸發 10 次
// → validateAddress 被呼叫 10 次
// → 但每次都清除上次 timer，只有最後一次真正執行 API ✅
```

### 跳過驗證的實現（更直觀）

```typescript
const { validateAddress, clearValidation } = useAddressValidation();

// Google Autocomplete 選擇時
onAutocompleteSelect(() => {
  clearValidation(); // 清除之前的驗證
  setValue("address", "...");
  // 直接不呼叫 validateAddress() 即可 ✅
});

// 手動輸入時
useEffect(() => {
  if (isFromAutocomplete) {
    setIsFromAutocomplete(false);
    return; // 跳過驗證
  }

  validateAddress(addressData); // 只在需要時呼叫
}, [address, isFromAutocomplete]);
```

---

## 兩種模式的詳細比較

| 特性              | 模式 1（useDebounce）          | 模式 2（內部 timer）      |
| ----------------- | ------------------------------ | ------------------------- |
| **觸發方式**      | **自動**：資料改變就驗證       | **手動**：呼叫函數才驗證  |
| **實現難度**      | 簡單，依賴現成的 `useDebounce` | 需要手動管理 timer 和清理 |
| **控制時機**      | 外部控制「傳什麼資料」         | 外部控制「何時呼叫」      |
| **跳過驗證**      | 需要額外 flag 或條件判斷       | 直接不呼叫函數即可        |
| **動態 debounce** | 需要額外 state 管理            | 呼叫時傳入參數即可        |
| **靈活性**        | 較低，適合固定邏輯             | 高，可以動態調整行為      |
| **程式碼直觀性**  | 聲明式，自動反應               | 命令式，明確控制          |
| **適用場景**      | 簡單的自動驗證                 | 需要精確控制時機          |

---

## 實際場景對比

### 場景 1：簡單的自動驗證

**需求**：使用者輸入地址後自動驗證，無特殊條件

**推薦**：模式 1 ✅

```typescript
// 模式 1 - 更簡潔
const address = watch("address");
const { isPOBox, suggestions } = useAddressValidation(address);
```

### 場景 2：條件性驗證（如 Google Autocomplete）

**需求**：

- 手動輸入時驗證
- Google Autocomplete 選擇時跳過驗證

**推薦**：模式 2 ✅

```typescript
// 模式 2 - 更直觀
const { validateAddress } = useAddressValidation();

useEffect(() => {
  if (isFromAutocomplete) {
    setIsFromAutocomplete(false);
    return; // 跳過驗證
  }
  validateAddress(addressData);
}, [address, isFromAutocomplete]);
```

### 場景 3：動態調整 debounce 時間

**需求**：不同情況使用不同的 debounce 時間

**推薦**：模式 2 ✅

```typescript
// 模式 2 - 可動態調整
validateAddress(addressData, isQuickCheck ? 300 : 800);
```

---

## 為什麼模式 1 無法直接實現 Debounce？

### 錯誤示範

```typescript
// ❌ 這樣無法 debounce
function useAddressValidation(addressData) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // 每次 addressData 改變就立即執行
    validateAPI(addressData).then(setResult);
  }, [addressData]); // addressData 每次改變都觸發

  return result;
}

// 問題：使用者打 "123 Main St"
// "1" → useEffect 觸發 → API 呼叫
// "12" → useEffect 觸發 → API 呼叫
// "123" → useEffect 觸發 → API 呼叫
// ... 總共 10 次 API 呼叫 ❌
```

### 為什麼無法 debounce？

- `addressData` 每次改變 → `useEffect` 立即執行
- Hook 內部無法「延遲」或「取消」外部傳入的資料
- 無法控制「何時」觸發驗證

### 解決方案

在 dependency 上使用 `useDebounce`：

```typescript
// ✅ 使用 useDebounce 處理 dependency
const debouncedAddressData = useDebounce(addressData, 800);

useEffect(() => {
  validateAPI(debouncedAddressData).then(setResult);
}, [debouncedAddressData]); // dependency 是 debounced 版本

// 使用者打 "123 Main St"
// → addressData 改變 10 次
// → debouncedAddressData 只在 800ms 後改變 1 次
// → useEffect 只觸發 1 次 ✅
```

---

## 總結與建議

### 選擇模式 1 的時機

- ✅ 簡單的自動驗證場景
- ✅ 不需要條件性跳過驗證
- ✅ debounce 時間固定
- ✅ 想要更簡潔的程式碼

### 選擇模式 2 的時機

- ✅ 需要條件性跳過驗證（如 Google Autocomplete）
- ✅ 需要動態調整 debounce 時間
- ✅ 需要更精確的控制時機
- ✅ 需要避免重複驗證（如檢查 lastValidationRef）
- ✅ 需要提供多個操作函數（如 clearValidation）

### 實際專案中的選擇

在 `useAddressValidation` 中選擇模式 2，是因為：

1. 需要在 Google Autocomplete 選擇時跳過驗證
2. 需要手動清除驗證結果（`clearValidation`）
3. 需要清除特定欄位建議（`clearSuggestionForField`）
4. 需要避免重複驗證相同地址（`lastValidationRef`）

這些需求用模式 2 實現更自然、更直觀。

---

## 參考資料

- Hook 實現：`hooks/useAddressValidation.ts`
- 使用範例：`components/checkout/delivery/DeliveryForm.tsx`
- API 端點：`pages/api/validate-address.ts`
