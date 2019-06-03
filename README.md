# OpenData.rs database

Generator baze resursa za [OpenData](https://opendata.rs).

## Postupak

Prvi korak je osvežavanje podataka postojećih online resursa:  

```shell
./download-all.sh
```

Zatim se pokreće program koji kreira bazu:

```shell
node index.js
```

Finalna verzije baze se kreira u:

```shell
./out/opendata.json
```

## Licenca

`CC-BY-4.0`
