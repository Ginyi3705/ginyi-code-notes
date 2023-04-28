## 查看端口

```shell
# 查看指定端口
netstat -apn | grep [端口号]
# 如netstat -apn | grep 8080

# 查看全部端口
netstat -apn
```

## 查看服务状态

```shell
# 查看指定服务状态
sudo service [服务名] status
# 如 sudo service docker status

# 查看全部服务状态, + 表示运行, - 表示停止, ? 表示服务在初始化或者启动时没有输出有效的状态
sudo service --status-all
```



## 创建文件 / 目录

创建文件

```shell
# 单纯创建文件
touch [文件名]
# 如 touch a.txt

# 创建文件并打开编辑
vim [文件名]
# 如 vim a.txt
```

创建目录

```shell
mkdir [目录名]
# 如 mkdir test
```



## 删除文件 / 目录

一般使用`rm`进行强删除，可删除文件和目录，可递归

`r`表示`递归`，`f`表示`强制删除`，删除时不会给出二次确认，慎用

```shell
rm -rf [目录名 | 文件名]
# 如 rm -rf test  递归删除test目录下的所有文件，包括test本身
```



## 移动文件 / 目录

使用 `mv  `，移动文件至其他目录下，后面跟的路径可以是相对路径，也可以是绝对路径

`i`表示如果目标路径下存在同名文件(目录)，系统会询问是否覆盖

```shell
mv -i [当前路径] [目标路径]
# 如 mv /test1/a.txt /test2
```



## 文件压缩与解压

常见的压缩包格式有 `.bz2`、`.Z`、`.gz`、`.zip`、`.xz`，压缩之后的文件或目录占用更少的空间







## 重命名文件 / 目录

`mv`命名，不仅可以移动文件，还可以重命名文件 / 目录

```shell
mv [旧名称] [新名称]
# 如 mv abc.txt aaa.txt  将当前路径下的abc.txt文件改名为aaa.txt, 也可移动到其他路径下
```



## 查找文件和目录

使用 `find` 命令快速查找出文件所在目录的地址



按照文件类型查找

`-type`表示查找不同类型的文件，`f `表示普通文件，`d`表示目录文件

**注意：** `[ f | d]` 不带有 `- `

```shell
find [目标目录路径] -type [ f | d ]
# 如查找 /home 目录下的所有目录文件
find /home -type d
```



按照文件类型查找

使用 `-name` 参数可以按照文件名来查找，这里以查找 `/home` 目录下所有的 `.txt` 文件为例

`*` 表示通配符，也可以指定文件名，如 `a.txt`

```shell
find [目标目录路径] -name [文件类型]
# 如 find /home -name *.txt
```



## 查看文件内容

`n` 表示带有行数，可选参数

```shell
cat -n [文件名]
#如 cat -n a.txt
```





## 查看进程

使用 `ps` 命令查看启动软件的进程，`grep [进程名称]`

```shell
ps -aux
# 查看所有进程信息

ps -aux | grep [进程名称]
# 如 ps -aux | grep docker 查看docker进程
```



## 防火墙

查看防火墙状态

```bash
sudo ufw status
```

开启防火墙

```bash
sudo ufw enable
```

关闭防火墙

```bash
sudo ufw disable
```

查看防火墙版本

```bash
sudo ufw version
```

默认允许外部访问本机

```bash
sudo ufw default allow
```


默认拒绝外部访问主机

```bash
sudo ufw default deny
```

允许外部访问`53`端口

```bash
sudo ufw allow 53
```

拒绝外部访问`53`端口

```bash
sudo ufw deny 53
```


允许`某个IP`地址访问本机所有端口

```bash
sudo ufw allow from 192.168.0.1
```







