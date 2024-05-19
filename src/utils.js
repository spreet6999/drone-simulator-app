import dronePathTemplateJSON from "./assets/drone-path-template.json";

export function convertObjectKeyValuesToNumber(data = []) {
  return data.map((obj) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "number") continue;
      else if (
        obj[key] &&
        typeof obj[key] === "string" &&
        !isNaN(Number(obj[key]))
      ) {
        obj[key] = Number(obj[key]);
      } else {
        throw new Error(`Invalid value for ${key}: ${obj[key]}`);
      }
    }
    return obj;
  });
}

export const parseTimeSeriesDataJSON = (data = []) => {
  try {
    const parsedData = JSON.parse(data);
    const formattedData = convertObjectKeyValuesToNumber(parsedData);
    return formattedData;
  } catch (error) {
    console.error(error);
    alert(
      "Invalid JSON data, please enter valid JSON data. You can validate your JSON data using https://jsonlint.com/"
    );
  }
};

const compareUploadedFileDataToTemplate = (
  requiredDataFormat,
  uploadedDataFormat
) => {
  if (!uploadedDataFormat) return false;
  if (!Array.isArray(uploadedDataFormat)) return false;

  const keys1 = Object.keys(requiredDataFormat[0]);

  for (const obj of uploadedDataFormat) {
    const keys2 = Object.keys(obj);

    if (keys1.length !== keys2.length) {
      return false;
    }

    //* Checking if all the keys in both objects are exactly same
    keys1.sort();
    keys2.sort();
    if (keys1.join("") !== keys2.join("")) {
      return false;
    }

    for (const key in keys1) {
      const value1 = requiredDataFormat[0][key];
      const value2 = obj[key];

      const type1 = Object.prototype.toString.call(value1);
      const type2 = Object.prototype.toString.call(value2);

      if (type1 !== type2) {
        return false;
      }

      if (value1 !== value2) {
        return false;
      }
    }
  }
  return true;
};

// Function to validate uploaded file against template format
export const validateDronePathFile = (file, onSuccess = () => {}) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const uploadedData = JSON.parse(event.target.result);
      const isValid = compareUploadedFileDataToTemplate(
        dronePathTemplateJSON,
        uploadedData
      );

      if (!isValid) {
        alert(
          "Uploaded file format does not match the template provided. Please upload a JSON file matching the template."
        );
        return null;
      } else {
        onSuccess(JSON.stringify(uploadedData, null, 2));
      }
    } catch (error) {
      console.error(error);
      alert(
        "Error parsing uploaded JSON file. Please upload a valid JSON file."
      );
      return null;
    } finally {
      reader.abort();
    }
  };
  reader.readAsText(file);
};
