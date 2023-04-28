# Docker容器技术

### 安装docker

建议使用`Linux`系统安装`docker`，以下为`CentOS`

```bash
# 1、yum 包更新到最新 
yum update
# 2、安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的 
yum install -y yum-utils device-mapper-persistent-data lvm2
# 3、 设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 4、 安装docker，出现输入的界面都按 y 
yum install -y docker-ce
# 5、 查看docker版本，验证是否验证成功
docker -v

```

### 配置镜像加速器

1、国外拉取镜像速度比较慢，可以更换国内阿里云镜像

操作：注册阿里云账号(可以不实名)，进入`控制台`，搜索`镜像服务`，找到`镜像加速器`，里面有专属自己的镜像加速器

2、直接使用现有的，支持`centos/ubuntu`

```bash
# 1、创建文件夹
sudo mkdir -p /etc/docker
# 2、配置镜像
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://rfo88l2p.mirror.aliyuncs.com"]
}
EOF
# 3
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### docker服务相关命令

#### 启动/关闭docker

```bash
systemctl start/stop docker  # 重启的话可以使用 restart
```

#### 设置开启自动启动docker服务

```bash
systemctl enable docker
```

#### 查看docker的状态

```bash
systemctl status docker
```

### docker镜像相关命令

#### 查看镜像

```bash
docker images
```

#### 搜索镜像

例如搜索`mysql:5.7`

```bash
docker search mysql:5.7  # ：后面是版本号  不指定默认为最新
```

#### 拉取镜像

例如拉取`mysql:5.7`

```bash
docker pull mysql:5.7  # ：后面是版本号  不指定默认为最新
```

#### 删除镜像

`rm`表示删除

`i`表示镜像

例如删除mysql:5.7（id为c20987f18b13）

```bash
docker rmi `镜像id`或者`mysql:5.7`    
```

### docker容器相关命令

#### 根据镜像创建容器

例如创建centos7的容器

`docker run`表示创建容器

`-i`表示让容器一直保持链接

`-t`表示为容器分配个终端

`-d`表示`exit`后容器依然保持在后台运行

`--name`表示给容器取个别名

`centos:7`指定镜像

`/bin/bash ` 表示打开shell脚本，可不写，默认就是/bin/bash



**注意**：通过`-it`创建的容器，一`创建就进入容器`，一`exit就关闭容器`

```bash
docker run -it --name=my_centos7 centos:7 /bin/bash    	 # exit后容器会关闭
```

**注意**：通过`-id`创建好容器后，不会马上进入容器，`exit不会关闭容器`

```bash
docker run -id --name=my_centos72 centos:7    			# exit后容器不会关闭

docker exec -it my2_centos7 /bin/bash				    # 进入容器，同时分配个终端给容器 
```

![image-20211227115251822](https://gitee.com/my-images/typora-imgs/raw/master/image-20211227115251822.png)

#### 查看容器状态

ps查看正在运行的容器

`-a`表示查看所有容器状态，不加只查看运行中的容器

```bash
docker ps -a
```

#### 启动/停止容器

例如`启动/停止`my_centos_2

```bash
docker start/stop my_centos_2
```

#### 删除容器

例如`删除`my_centos_2

**注意**：运行中的容器无法删除，故删除前应先停止容器的运行

```bash
docker rm my_centos_2
```

#### 查看容器详细信息

例如`my_centos`容器的详细信息

```bash
docker inspect my_centos
```

### 数据卷

数据卷可以用来做持久化，即容器删除，数据还在

#### 配置数据卷

> 1、一个数据卷可以挂载多个容器
>
> 2、多个容器也可以挂载同一个数据卷

例如创建`centos7容器`，将宿主机的`/root/docker/data`目录挂`载到容器中`的`/root/data_contrainer`

`-v 宿主机目录：容器目录 `(**注意**：目录不存在会自动创建)

`/bin/bash可以省略`

```bash
docker run -it --name=my_cnetos7 -v /root/docker/data:/root/data_contrainer centos:7 /bin/bash
```

### 数据卷容器

数据卷容器可以实现多个容器的数据进行交换，相当于多个容器绑定同一个数据卷


#### 创建数据卷容器

1、创建启动my_data_contrainer数据卷容器，使用-v参数设置数据卷

```bash
docker run -it --name=my_data_contrainer -v /volume centos:7 /bin/bash
```

2、创建启动my_centos7_1、my_centos7_2容器，使用--volume-from参数设置数据卷

```bash
docker run -it --name=my_centos7_1 -v --volumes-from my_data_contrainer centos:7 /bin/bash

docker run -it --name=my_centos7_2 -v --volumes-from my_data_contrainer centos:7 /bin/bash
```



### docker应用部署

#### 部署MySQL

1. 搜索mysql镜像

```shell
docker search mysql
```

2. 拉取mysql镜像

```shell
docker pull mysql:5.7
```

3. 创建容器，设置端口映射、目录映射

```shell
# 在/root/docker目录下创建mysql目录用于存储mysql数据信息
cd ~
mkdir ~/docker/mysql
cd ~/docker/mysql
```

```shell
sudo docker run -id \
-p 3306:3306 \
--name=u_mysql_8.0 \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0
```

- 参数说明：
  - **-p 3307:3306**：将容器的 3306 端口映射到宿主机的 3307 端口。
  - **-v $PWD/conf:/etc/mysql/conf.d**：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。配置目录
  - **-v $PWD/logs:/logs**：将主机当前目录下的 logs 目录挂载到容器的 /logs。日志目录
  - **-v $PWD/data:/var/lib/mysql** ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql 。数据目录
  - **-e MYSQL_ROOT_PASSWORD=123456：**初始化 root 用户的密码。



4. 进入容器，操作mysql

```shell
docker exec –it c_mysql /bin/bash
```

5. 使用外部机器连接容器中的mysql

   

#### 部署Tomcat

1. 搜索tomcat镜像

```shell
docker search tomcat
```

2. 拉取tomcat镜像

```shell
docker pull tomcat
```

3. 创建容器，设置端口映射、目录映射

```shell
# 在/root/docker目录下创建tomcat目录用于存储tomcat数据信息
cd ~
mkdir ~/docker/tomcat
cd ~/docker/tomcat
```

```shell
docker run -id --name=c_tomcat \
-p 8080:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat 
```

- 参数说明：

  - **-p 8080:8080：**将容器的8080端口映射到主机的8080端口

    **-v $PWD:/usr/local/tomcat/webapps：**将主机中当前目录挂载到容器的webapps

4. 使用外部机器访问tomcat

   **注意：**此时访问`ip:8080`会显示404

   可以创建个测试项目，操作如下

   ```bash
   cd tomcat
   mkdir test
   cd test
   vim index.html
   <h1>hello tomcat docker</h1> # 保存退出
   ```

   打开浏览器：`ip:8080/test/index.html`即可访问

   

#### 部署Nginx

1. 搜索nginx镜像

```shell
docker search nginx
```

2. 拉取nginx镜像

```shell
docker pull nginx
```

3. 创建容器，设置端口映射、目录映射


```shell
# 在/root/docker目录下创建nginx目录用于存储nginx数据信息
cd ~
mkdir ~/nginx
cd ~/nginx
mkdir conf	# 提前准备好conf目录
cd conf
# 在~/nginx/conf/下创建nginx.conf文件,粘贴下面内容
vim nginx.conf
```

```shell
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}


```




```shell
sudo docker run -id --name=c_nginx_test \
-p 8099:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx

sudo docker run -id --name=u_nginx_college_office_admin \
-p 8899:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx:latest

sudo docker run -id --name=u_nginx_office \
-p 6080:80 \
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
-v $PWD/logs:/var/log/nginx \
-v $PWD/html:/usr/share/nginx/html \
nginx:latest
```

- 参数说明：
  - **-p 80:80**：将容器的 80端口映射到宿主机的 80 端口。
  - **-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf**：将主机当前目录下的 /conf/nginx.conf 挂载到容器的 :/etc/nginx/nginx.conf。配置目录
  - **-v $PWD/logs:/var/log/nginx**：将主机当前目录下的 logs 目录挂载到容器的/var/log/nginx。日志目录

4. 使用外部机器访问nginx

   **注意：**此时访问`ip:80`会显示403

   可以创建个测试项目，操作如下

   ```bash
   cd html
   vim index.html
   <h1>hello nginx docker</h1> # 保存退出
   ```

   打开浏览器：`ip:80`即可访问



#### 部署Redis

1、搜索redis镜像

```shell
docker search redis
```

2、拉取redis镜像

```shell
docker pull redis:5.0.8
```

3、创建容器，设置端口映射、目录映射

```bash
# 在/root/docker目录下创建tomcat目录用于存储tomcat数据信息
cd ~
mkdir ~/docker/redis
cd ~/docker/redis
```

4、使用外部机器连接redis

```bash
sudo docker run -id --name=u_redis \
-p 6379:6379 redis:5.0.8
```

5、外部访问redis



#### 部署MongoDB

1、搜索redis镜像

```shell
docker search mongo
```

2、拉取redis镜像

```shell
docker pull mongo
```

3、创建容器，设置端口映射、目录映射

```bash
# 在/root/docker目录下创建tomcat目录用于存储tomcat数据信息
cd ~
mkdir ~/docker/mongodb
cd ~/docker/mongodb
```

4、使用外部机器连接MongoDB

```bash
sudo docker run -id --name=u_mongodb \
-v $PWD/data:/data/db \
-p 27017:27017 mongo:latest
```

5、外部访问MongoDB



#### 将部署应用设置docker开启时自启

```bash
docker update --restart=always [容器名称]
```

#### 容器重命名

```bash
 sudo docker rename [oldname] [newname]
```

### docker查看容器运行日志

```bash
sudo docker logs 容器id或者容器名称
```

### docker镜像制作

#### 1、容器转镜像

**注意：**挂载的文件在转为镜像时，不会被写入。但是除了挂载的文件外，其余文件可以被写入。

```bash
docker commit 容器id 镜像名称：版本号    			# 制作镜像
docker save -o 压缩文件名称 镜像名称：版本号		 # 压缩一下镜像文件名称
docker load -i 压缩文件名称					  # 解压压缩后的镜像

```

#### 2、镜像制作

制作镜像的指令大全

```bash
FROM            # 基础镜像，一切从这里开始
MAINTAINER      # 镜像是谁写的，姓名+邮箱
RUN             # 镜像构建的时候需要执行的命令
ADD             # 添加内容，
WORKDIR         # 镜像的工作目录
VOLUME          # 卷挂载的目录
EXPOSE          # 暴漏端口配置，与docker run -p 宿主机端口:容器内端口 效果一样
CMD             # 指定这个容器启动的时候要运行的命令，只有最后一个会生效
ENTRYPOINT      # 指令这个容器启动的时候执行的命令
ONBUILD         # 当构建一个被继承的DockerFile时，会运行ONBUILD的指令，触发指令
COPY            # 类似于ADD，将我们文件拷贝到镜像中
ENV             # 构建的时候设置环境变量
```

#### 3、镜像构建

```bash
sudo docker build -f Dockerfile文件名 -t 目标镜像名 .
```

> -f 是指哪个镜像文件
>
> -t 是指要生成的目标镜像
>
> **注意**：不要漏了最后的`.`    如果`dockerfile文件名`是Dockerfile则可以省略 `-f Dockerfile文件名`



##### 构建Springboot镜像文件

> 步骤：
>
> 1. 基于java8的环境
> 2. 拷贝jar包到根目录下，命名为app.jar
> 3. 服务端口
> 4. 对外暴露的端口
> 5. 执行jar包的命令

```shell
FROM java:8
COPY *.jar /app.jar
# CMD ["--server.port=8080"] 尽量不加指定端口吧，主机会访问不到
EXPOSE 8080 # 对外暴露默认的服务端口 具体查看yml文件
ENTRYPOINT ["java","-jar","/app.jar"]
```

根据Dockerfile镜像文件创建镜像

**注意**：把`jar包`跟`Dockerfile文件`拷贝到`Linux`下，并在其所在的路径下，输入命令创建容器

```bash
sudo docker build -t SpringbootImage01:1.0 .
```

根据已生成的镜像创建容器

如需映射成其他端口，可以加上` -p `参数，如：`-p 8888:8080`

```shell
sudo docker run -id --name=SpringbootApp01 SpringbootImage01:1.0
```

**注意：**连接服务的ip要使用服务器的ip，不能是127.0.0.1，否则会找不到服务地址。





##### 构建Vue项目镜像

首先将vue项目build一下，打包出来

> 步骤：
>
> 1. 设置基础镜像，利用nginx来做反向代理
> 2. 拷贝dist中文件到指定目录下
> 3. 新建nginx配置来覆盖nginx镜像中的配置

```shell
FROM nginx:latest
COPY dist/  /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
```

新建nginx默认配置文件，`default.conf`

```bash
server {
    listen       80;
    server_name  localhost;
 
    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;
 
    location / {
        # root 根目录，默认nginx镜像的html文件夹，可以指定其他
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        # 如果vue-router使用的是history模式，需要设置这个 
        try_files $uri $uri/ /index.html;
    }
 
    #error_page  404              /404.html;
 
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

根据Dockerfile镜像文件创建镜像

**注意**：把`dist`、`default.conf`跟`Dockerfile文件`拷贝到`Linux`下，并在其所在的路径下，输入命令创建容器

```bash
sudo docker build -t VueImage01:1.0 .
```

根据已生成的镜像创建容器

如需映射成其他端口，可以加上` -p `参数，如：`-p 9999:80`

```shell
sudo docker run -id --name=VueApp01 VueImage01:1.0
```
