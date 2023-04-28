## MySQL简单介绍

> MySQL是一种 `关系型数据库`，关系型数据库的特点：
>
> - 数据以表格的形式出现
> - 每行为各种记录名称
> - 每列为记录名称所对应的数据域
> - 许多的行和列组成一张表单
> - 若干的表单组成`database`



## SQL通用语法

> 1. SQL语句可以单行或多行书写，以分号结尾
> 2. SQL语句可以使用空格或缩进来增强语句的可读性
> 3. MySQL数据库的SQL语句不区分大小写，关键字建议使用大写
> 4. 注释：
>    - 单行注释： `-- [注释内容]` 或 `# [注释内容] `
>    - 多行注释：`/* [注释内容] */`



## SQL分类

| 分类 | 全称                     | 说明                                                   |
| ---- | ------------------------ | ------------------------------------------------------ |
| DDL  | Data Definition Language | 数据定义语言，用来定义数据库对象（数据库、表、字段）   |
| DML  | Data Manipution Language | 数据操作语言，用来对数据库表的数据进行增删改           |
| DQL  | Data QueryLanguage       | 数据查询语言，用来查询数据库中表的记录                 |
| DCL  | Data Control Language    | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |





## SQL DDL语法

| 有关数据库的基础语法                                | 描述                       |
| --------------------------------------------------- | -------------------------- |
| use 数据库名;                                       | 选择数据库                 |
| create database 数据库名 (charset 编码格式);        | 删除数据库(删)             |
| drop database 数据库名;                             | 删除数据库(删)             |
| alter database 数据库名 (charset 修改后的编码格式); | 修改数据库(改)             |
| show create database 数据库名;                      | 查看当前新创建的数据库(查) |
| show databases;                                     | 查看所有数据库(查)         |





## SQL DML语法

### 添加数据

1. 给指定字段添加数据

   ```sql
   insert into 表名(字段名1, 字段名2, ...) values (值1, 值2, ...)
   
   -- 示例
   insert into user(name, age) values ('zhangsan', 20)
   ```

2. 给全部字段添加数据

   ```sql
   insert into 表名 values (值1, 值2, ...)
   
   -- 示例
   insert into user values ('zhangsan', 20)
   ```

3. 批量添加数据

   ```sql
   -- 第一种
   insert into 表名(字段名1, 字段名2, ...) values (值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...)
   -- 示例
   insert into user(name, age) values ('zhangsan', 18),('lisi', 20),('wangwu', 20)
   
   -- 第二种
   insert into 表名 values (值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...)
   -- 示例
   insert into user values ('zhangsan', 18),('lisi', 20),('wangwu', 20)
   ```

**注意：**

- 插入数据时，指定的字段顺序需要与值得顺序是一一对应的
- 字符串和日期型数据应该包含在引号中
- 插入的数据大小，应该在字段的规定范围内





### 修改数据

```sql
update 表名 set 字段1=值1, 字段2=值2, ... [where 条件]

-- 示例
update user set name='张三', age=50 where name='zhangsan'
```

**注意：**修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据







### 删除数据

```sql
delete from 表名 [where 条件]
delete from user name='zhangsan'
```

**注意：**删除语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据







## SQL DQL语法

查询关键字：`select`

```sql
select
	字段列表
from
	表名列表
where
	条件列表
group by
	分组字段列表
having
	分组后条件列表
order by
	排序字段列表
limit
	分页参数
```

### 基本查询

查询多个字段

```sql
select 字段1, 字段2, ... from 表名

-- 示例
select name, age from user
```

```sql
select * from 表名

-- 示例
select * from user
```

设置别名

```sql
select 字段1 [as 别名1], 字段2 [as 别名1], ... from 表名

-- 示例
select name as 姓名 age as 年龄 from user
```

去除重复记录

```sql
select distinct 字段列表 from 表名

-- 示例
select distinct name from user
```





### 条件查询

语法

```sql
select 字段列表 from 表名 where 条件列表

-- 示例
select age from user where age>20
select age from user where age>=20

select age from user where age<20
select age from user where age<=20

select age from user where age!=20
select age from user where age<>20

select age from user where age between 20 and 40 -- 注意: 小值在前，大值在后

select age from user where age in(20, 40) -- 年龄为20或者40的

select age from user where age like 2_  -- 如21, 22, 23...等
select age from user where age like 2%  -- 如21, 211, 2111...等

select age from user where isnull(age)

select age from user where name='zhangsan' && age=20
select age from user where name='zhangsan' and age=20

select age from user where name='zhangsan' || age=20
select age from user where name='zhangsan' or age=20

```

| 比较运算符       | 功能                                                 |
| ---------------- | ---------------------------------------------------- |
| >                | 大于                                                 |
| >=               | 大于等于                                             |
| <                | 小于                                                 |
| <=               | 小于等于                                             |
| =                | 等于                                                 |
| <> 或 !=         | 不等于                                               |
| between...and... | 在某个范围之内（含最小、最大值）                     |
| in(...)          | 在`in`之后的列表中的值，多选一                       |
| like             | 占位符，模糊匹配，`_`匹配单个字符，`%`匹配任意个字符 |
| is null          | 是`null`                                             |

| 逻辑运算符 | 功能                       |
| ---------- | -------------------------- |
| and 或 &&  | 并且                       |
| or 或 \|\| | 或者(多个任意条件一个成立) |
| not 或 ！  | 非，不是                   |



### 聚合函数

> 将一列数据作为一个整体，进行纵向计算

语法

```sql
select 聚合函数(字段列表) from 表名

-- 示例
select count(*) form user		 -- 统计数量
select count(name) form user 

select avg(age) from user
select max(age) from user
select sum(age) from user

```

| 常见聚合函数 | 功能     |
| ------------ | -------- |
| count        | 统计数量 |
| max          | 最大值   |
| min          | 最小值   |
| avg          | 平均值   |
| sum          | 求和     |





### 分组查询

语法

```sql
select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件]

-- 示例
select gender, count(*) from user group by gender							-- 根据性别分组，统计用户数量
select gender, avg(age) from user group by gender							-- 根据性别分组，计算用户平均年龄
select * from user where age < 20 group by gender having name!='zhangsan' 	   -- 查询age小于20的用户，根据性别分组, 过滤掉name等于zhangsan的用户
```

**注意：**

> where 与 having的区别：
>
> - 执行时机不同：where是分组之前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤
> - 判断条件不同：where不能对聚合函数进行判断，而having可以
> - 执行顺序：where > 聚合函数 > having
> - 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义





### 排序查询

> 排序方法：
>
> - 升序  ASC （默认）
> - 降序  DESC
>
> **注意：**如果是多字段排序，当第一个字段相同时，才会根据第二个字段进行排序

语法

```sql
select 字段列表 from 表名 order by 字段1 排序方式1, 字段2 排序方式2

-- 示例
select * from user order by age asc
select * from user order by age desc

```



### 分页查询

> **注意：**
>
> 1. 起始索引为0，起始索引 = (查询页码 - 1) * 每页显示记录数
> 2. 分页查询是数据库的方言

语法

```sql
select 字段列表 from 表名 limit 起始索引, 查询的条数

-- 示例
select * from user limit 0, 5  -- 第1页，每页5条
select * from user limit 1, 5  -- 第2页，每页5条

```





## SQL DCL语法

> SQL DCL，用来管理数据库用户、控制数据库的访问权限

### 用户管理

**注意：**主机名可以使用%通配符

查询用户

```sql
use mysql
select * from user
```

创建用户

```sql
create user '用户名'@'主机名' identified by '密码'

-- 示例
create user 'user01'@'localhost' identified by '123456' 	 -- 创建user01用户，密码123456，只能当前主机访问
create user 'user01'@'%' identified by '123456' 			-- 创建user01用户，密码123456，任意主机可以访问
```

修改用户

```sql
alter user '用户名'@'主机名' identified with mysql_native_password by '新密码'

-- 示例
alter user 'user01'@'%' identified with mysql_native_password by '666666'
```

删除用户

```sql
drop user '用户名'@'主机名'

-- 示例
drop user 'user01'@'localhost'
```



### 权限管理

注意：

- 多个权限之间，使用`逗号`分隔
- 授权时，数据库名和表名可以使用`*`进行通配，代表所有

| 权限                  | 说明                   |
| --------------------- | ---------------------- |
| `all, all privileges` | 所有权限               |
| `select`              | 查询数据               |
| `insert`              | 插入数据               |
| `update`              | 修改数据               |
| `delete`              | 删除数据               |
| `alter`               | 修改表                 |
| `drop`                | 删除数据库 / 表 / 视图 |
| `create`              | 创建数据库 / 表        |



查询权限

```sql
show grant for '用户名'@'主机名'

-- 示例
show grant for 'user01'@'%'
```

授予权限

```sql
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'

-- 示例
grant all on database01.* to 'user01'@'%'   -- 给user01用户赋予database01这个数据库下所有表的全部权限 
```

撤销权限

```sql
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名'

-- 示例
revoke all on database01.* from 'user01'@'%'	-- 撤销user01用户database01这个数据库下所有表的全部权限 
```





## 函数

> 主要有如下四类函数：
>
> 1. 字符串函数
> 2. 数值函数
> 3. 日期函数
> 4. 流程函数



### 字符串函数

| 函数                         | 功能                                                      |
| ---------------------------- | --------------------------------------------------------- |
| `concat(s1, s2, s3)`         | 字符串拼接，将s1, s2, s3, ...拼接成一个字符串             |
| `lower(str)`                 | 将字符串str全部转为小写                                   |
| `upper(str)`                 | 将字符串str全部转为大写                                   |
| `lpad(str, n, pad)`          | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 |
| `rpad(str, n, pad)`          | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 |
| `trim(str)`                  | 去掉字符串头部和尾部的空格                                |
| `substring(str, start, len)` | 返回字符串str从start位置起的len个长度的字符串             |



```sql
-- 示例

select concat('hello', ' world')  			-- hello world
select lower('HELLO') 					   -- hello
select upper('hello')					   -- HELLO
select lpad('01', 5, '#')				   -- ##01
select rpad('01', 5, '#')				   -- 01##
select trim(' hello world ')			   -- hello world
select substring('hello world', 1, 5)	    -- hello 

```



### 数值函数

| 函数          | 说明                                   |
| ------------- | -------------------------------------- |
| `ceil(x)`     | 向上取整                               |
| `floor(x)`    | 向下取整                               |
| `mod(x, y)`   | 返回`x/y`的模                          |
| `rand()`      | 返回`0~1内`的随机数                    |
| `round(x, y)` | 求参数`x`的四舍五入的值，保留`y`位小数 |



```sql
-- 示例
select ceil(1.1)          -- 2
select floor(1.9)		  -- 1
select mod(3, 4)		  -- 3
select rand()			  -- 0.161687416713
select round(2.3567, 2)	   -- 2.36 
```



### 日期函数

| 函数                                 | 说明                                                  |
| ------------------------------------ | ----------------------------------------------------- |
| `curdate()`                          | 返回当前日期                                          |
| `curtime()`                          | 返回当前时间                                          |
| `now()`                              | 返回当前日期和时间                                    |
| `year(date)`                         | 获取指定date的年份                                    |
| `month(data)`                        | 获取指定date的月份                                    |
| `day(date)`                          | 获取指定date的日期                                    |
| `date_add(date, INTERVAL expr type)` | 返回一个`日期/时间`值加上一个`时间间隔expr`后的时间值 |
| `datediff(date1, date2)`             | 返回`起始时间date1` 和 `结束时间date2` 之间的天数     |



```sql
-- 示例
select curdate()		-- 2022-07-15
select curtime()		-- 04:01:28
select now()		    -- 2022-07-15 04:01:55
select year(now())		-- 2022
select month(now())		-- 7
select day(now())		-- 15

select date_add(now(), interval 70 year)		-- 在当前年份基础再加70年
select date_add(now(), interval 70 month)		-- 在当前年份基础再加70个月
select date_add(now(), interval 70 day)			-- 在当前年份基础再加70天

select datediff('2022-7-15', '2000-01-01')		-- 8231天
```



### 流程函数

| 函数                                                         | 说明                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| `if(value, t, f)`                                            | 如果value为true，则返回t， 否则返回f                       |
| `ifnull(value1, value2)`                                     | 如果value1不为空，返回value1，否则返回value2               |
| `case when [value1] then [res1] ... else [default] end`      | 如果value1为true，... 否则返回default默认值                |
| `case [expr] when [value1] then [res1] ... else [default] end` | 如果expr的值等于value1，返回res1，...否则返回default默认值 |



```sql
-- 示例
select if(true, 'ok', 'error')		-- ok
select if(false, 'ok', 'error')		-- error

select ifnull('ok', 'default')		-- ok
select ifnull('', 'default')		-- ''
select ifnull(null, 'default')		-- default

```

有`员工表(employee)`，如下

| 员工姓名(name) | 工作地址(adress) |
| -------------- | ---------------- |
| 张三           | 北京             |
| 李四           | 上海             |
| 王五           | 北京             |
| 老六           | 武汉             |

```sql
-- 需求: 查询 employee 表的员工姓名和工作地址，北京/上海的显示一线城市，其他显示二线城市
select 
	name,
	case adress when '北京' then '一线城市' when '上海' then '一线城市' else '二线城市' end
	from employee
```





## 约束

> - 概念：约束时作用于表中字段上的规则，用于限制存储在表中的数据
> - 目的：保证数据库中数据的正确、有效性和完整性

| 约束                           | 关键字        | 描述                                                     |
| ------------------------------ | ------------- | -------------------------------------------------------- |
| 非空约束                       | `not null`    | 限制该字段的数据不能为null                               |
| 唯一约束                       | `unique`      | 保证该字段的所有数据都是唯一的、不重复的                 |
| 主键约束                       | `primary key` | 主键是一行数据的唯一标识，要求非空且唯一                 |
| 默认约束                       | `default`     | 保存数据时，如果未指定该字段的值，则采用默认值           |
| 检查约束（`MySQL8.0+`才支持 ） | `check`       | 保证字段值满足某一个条件                                 |
| 外键约束                       | `foreign key` | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 |



完成如下要求

| 字段名   | 字段含义   | 字段类型      | 约束条件                  | 约束关键字                    |
| -------- | ---------- | ------------- | ------------------------- | ----------------------------- |
| `id`     | id唯一标识 | `int`         | 主键，并且自动增长        | `primary key, auto_increment` |
| `name`   | 姓名       | `varchar(10)` | 不为空                    | `not null, unique`            |
| `age`    | 年龄       | `int`         | 大于0，并且小于等于120    | `check`                       |
| `status` | 状态       | `char(1)`     | 如果没有指定该值，默认为1 | `default`                     |
| `gender` | 性别       | `char(1)`     | 无                        |                               |

```sql
create table user(
	id int primary key auto_increment comment 'id主键',
	name varchar(10) not null unique comment '姓名',
	age int check (age > 0 && age <= 120) comment '年龄',
	status char(1) default '1' comment '状态',
	gender char(1) comment '性别',
) comment '用户表'
```





































