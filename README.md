# ResxManager

*https://resx-manager.romainbourre.fr*

This application allow user to manage RESX resource file. The user will be able to:
- Edit key of resource file
- Filter keys
- Translate value with Google Translation
- Export your edited resource file

## Docker

To build docker image, type on the console:
```
docker build -t resx-manager:latest -f docker/Dockerfile .
```

To run image just type:
```
docker run --name resx-manager -p 8080:80 resx-translator:latest
```
