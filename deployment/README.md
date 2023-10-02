# Installing sample content
This folder contains content items for the sensenet CSP sample applications. To install these content items, please prepare a sensenet content repository to install contents to.

## Configuration

Create a configuration file in this folder with the name ```secret-local.json``` and fill it with the following connection values that correspond to the ```snio``` tool configuration:

```json
{
 	"repositorywriter": {
		"url": "https://example.cloud",
 		"authentication": {
 			"clientid": "your_clientid",
 			"clientsecret": "your_secret"
 		}
 	}
}
```

Alternatively you can provide these parameters one-by-one to the import script. You can also create any number of configuration files and provide the appropriate file path to the script as the ```PATFile``` parameter.

## Running the script
If you provided the necessary values in the configuration, you can run the script without parameters:

```powershell
.\import-sample.ps1
```

Otherwise please refer to the script for optional parameters for source and target values and feature switches.