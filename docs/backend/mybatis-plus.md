## **MyBatis-Plus**

> `MyBatis-Plus`（简称 MP）是一个`MyBatis`的增强工具，在 `MyBatis `的基础上`只做增强不做改变`，为简化开发、提高效率而生。



## 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作





## 快速入门

> 开发步骤： 
>
> 1. 添加MyBatis-plus坐标
> 2. 创建数据表
> 3. 创建实体类
> 4. 创建接口
> 5. 测试





MyBatisPlus 依赖

```xml
<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!-- druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.23</version>
</dependency>
<!-- mybatis-plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>
```

创建数据表

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

创建实体类 user

```java
package com.example.domain;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private Integer age;
    private String tel;
}
```

创建接口

```java
package com.example.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<User> {
}
```

测试

```java
package com.example;

import com.example.dao.UserDao;
import com.example.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MybatisPlusApplicationTests {

    @Autowired
    private UserDao userDao;

    @Test
    void testFindAll() {
        List<User> userList = userDao.selectList(null);
        for (User user : userList) {
            System.out.println(user);
        }
    }

}
```

```
2022-08-24 16:58:41.308  INFO 18160 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2022-08-24 16:58:41.860  INFO 18160 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
User(id=1, username=tony, password=123456, age=3, tel=1380016489)
User(id=2, username=tom, password=111222, age=4, tel=1043764116)
User(id=3, username=lucy, password=666666, age=34, tel=1984677634)
```

## CURD

以`userDao`为例

| 操作       | 相关api                     |
| ---------- | --------------------------- |
| 查询全部   | `userDao.selectList(null);` |
| 根据id查询 | `userDao.selectById(2);`    |
| 根据id更新 | `userDao.updateById(user);` |
| 添加       | `userDao.insert(user);`     |
| 根据id删除 | `userDao.deleteById(4);`    |



## 分页

>实现步骤：
>
>1. 添加MyBatisPlus的分页拦截器
>2. 创建分页对象
>3. 获取分页信息



配置分页拦截器

新建`MyBatisPlusInterceptorConfig.java`拦截器配置类

```java
package com.example.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisPlusInterceptorConfig {

    @Bean
    public MybatisPlusInterceptor myBatisPlusInterceptor(){
        // 定义拦截器
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加具体得拦截器：分页拦截器
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }

}
```

创建分页对象

```java
IPage page = new Page(1, 2);  // 第一个参数是第几页，第二个参数每页条目数
```

获取分页信息

```java
@Test
public void testGetByPage(){
    IPage page = new Page(1, 2);
    userDao.selectPage(page, null);
    System.out.println("当前页码值： " + page.getCurrent());
    System.out.println("每页显示条数： " + page.getSize());
    System.out.println("一共多少页： " + page.getPages());
    System.out.println("一共多少条数据： " + page.getTotal());
    System.out.println("数据： " + page.getRecords());
}
```

```
当前页码值： 1
每页显示条数： 2
一共多少页： 2
一共多少条数据： 3
数据： [User(id=1, username=tommmmm, password=123456, age=3, tel=1380016489), User(id=2, username=tom, password=111222, age=4, tel=1043764116)]
```



## DQL编程控制

### 条件查询方式

| 条件对象                   | 说明                            |
| -------------------------- | ------------------------------- |
| `QueryWrapper`             | 创建普通查询对象                |
| `QueryWrapper`             | 创建普通查询对象 + Lambda表达式 |
| `LambdaQueryWrapper`(推荐) | Lambda表达式                    |

示例

```java
@Test
public void testCondition(){
    
    // 创建普通查询对象
    QueryWrapper<User> wrapper1 = new QueryWrapper<>();
    wrapper1.lt("age", 18);  // age小于18
    List<User> userList1 = userDao.selectList(wrapper1);
    for (User user : userList1) {
        System.out.println(user);
    }

    // 创建普通查询对象 + Lambda表达式
    QueryWrapper<User> wrapper2 = new QueryWrapper<>();
    wrapper2.lambda().lt(User::getAge, 18);
    List<User> userList2 = userDao.selectList(wrapper2);
    for (User user : userList2) {
        System.out.println(user);
    }

    // Lambda表达式
    LambdaQueryWrapper<User> wrapper3 = new LambdaQueryWrapper<>();
    wrapper3.lt(User::getAge, 18);
    List<User> userList3 = userDao.selectList(wrapper3);
    for (User user : userList3) {
        System.out.println(user);
    }
}
```

Lambda表达式多条件查询

> 多条件查询，使用链式编程可以一直链接下去，默认使用的是`and并`规则，如果要使用`or或`规则，则需要加`or()`

示例

```java
@Test
public void testCondition(){
    

    // 大于10小于50
    LambdaQueryWrapper<User> wrapper4 = new LambdaQueryWrapper<>();
    wrapper4.ge(User::getAge, 10)
            .lt(User::getAge, 50);
    List<User> userList4 = userDao.selectList(wrapper4);
    for (User user : userList4) {
        System.out.println(user);
    }

    // 小于10 或者 大于50
    LambdaQueryWrapper<User> wrapper5 = new LambdaQueryWrapper<>();
    wrapper5.ge(User::getAge, 50)
            .or()
            .lt(User::getAge, 10);
    List<User> userList5 = userDao.selectList(wrapper5);

    for (User user : userList5) {
        System.out.println(user);
    }
}
```



条件空值null处理

| 操作方式            | 说明                       |
| ------------------- | -------------------------- |
| `if判断`            | 繁琐，一个判断一个if       |
| `wrapper条件表达式` | 可以将条件判断写在方法当中 |

示例

```java
@Test
public void testCondition2(){
    Integer age = 18;
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();

    // 方式一
    if (age != null) {
        wrapper.lt(User::getAge, age);
    }

    // 方式二(推荐)
    wrapper.lt(age != null, User::getAge, age);

    List<User> userList = userDao.selectList(wrapper);
    for (User user : userList) {
        System.out.println(user);
    }
}
```



### 查询投影

> 查询投影：指的是查询指定的字段
>
> - 查询实体类中`存在`的属性，可以用`LambdaQueryWrapper`表达式
>
> - 查询实体类中`不存在`的属性，只能`QueryWrapper`，例如 count(*)

```java
// 查询投影
@Test
public void testCondition3(){
    // 查询结果包含模型类中的部分属性
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
    wrapper.select(User::getId, User::getUsername, User::getAge);
    List<User> userList = userDao.selectList(wrapper);
    System.out.println(userList);

    // 查询结果包含模型类中未定义的属性
    QueryWrapper<User> wrapper1 = new QueryWrapper<>();
    wrapper1.select("count(*) as count"); 
    List<Map<String, Object>> userList1 = userDao.selectMaps(wrapper1); // 因为count不是实体类属性，所以要用map来接收
    System.out.println(userList1);

}
```



### 查询条件设定

| 条件方法                           | 说明        |
| ---------------------------------- | ----------- |
| `lt`                               | <           |
| `le`                               | <=          |
| `gt`                               | >           |
| `ge`                               | >=          |
| `eq`                               | ==          |
| `ne`                               | !=          |
| `between`                          | 范围查询    |
| `like`                             | 模糊查询    |
| `orderBy  orderByDesc  orderByAsc` | 排序        |
| `groupBy `                         | 分组查询    |
| `isNull`                           | NULL 值查询 |





### 字段映射与表名映射

> 实体类与数据表之间，不一定存在一一对应的规则
>
> - 比如实体类属性password，而数据库字段是pwd，对应不上会报错
> - 比如实体类类名为User，而数据库表表名为tb_user，对应不上会报错
> - 比如实体类中存在某个字段，而没有数据库不存在该字段，无法对应上会报错
> - ... 

解决方法，加上对应注解，如下：

| 注解                                         | 作用                                           |
| -------------------------------------------- | ---------------------------------------------- |
| `@TableName("tb_user")`                      | 将`数据库表名`映射到具体`实体类类名`           |
| `@TableField(value = "pwd")`                 | 将`数据库字段pwd`映射到`实体类属性password`上  |
| `@TableField(exist = false)`                 | 避免数据库中`不存在某个字段`而查询不到出现报错 |
| `@TableField(value = "pwd", select = false)` | `select`表示是否参与查询，`false`代表`不参与`  |
|                                              |                                                |





## DML编程控制

### id生成策略

> 不同的表可能应用着不同的id生成策略：
>
> - 日志：自增（1，2，3，4，...）
> - 购物订单：特殊规则（FQ61684AK6595）
> - 外卖单：关联地区日期信息（10 04 20200314 34 91）
> - ...

使用`@TableId`指定MyBatis-plus提供的生成策略，有更多的需求的可以自定义

| 生成策略                              | 说明                           |
| ------------------------------------- | ------------------------------ |
| `@TableId(type = IdType.NONE)`        | 该类型为未设置主键类型（默认） |
| `@TableId(type = IdType.INPUT)`       | 用户自定义ID策略               |
| `@TableId(type = IdType.AUTO)`        | 数据库ID自增                   |
| `@TableId(type = IdType.ASSIGN_ID)`   | 雪花算法生成ID                 |
| `@TableId(type = IdType.ASSIGN_UUID)` | UUID                           |



### 多查询与多删除

> 根据传入`id`列表，查询或删除多条记录
>
> 相关api是`selectBatchIds(ids)`和`deleteBatchIds(ids)`
>
> ```java
> List<Long> ids = Arrays.asList(new Long[]{2L, 3L});
> userDao.selectBatchIds(ids);
> userDao.deleteBatchIds(ids);
> ```



### 逻辑删除

> 逻辑删除是指为数据设置是否可用状态字段，删除时设置状态为不可用状态，数据保留在数据库中 `(俗称：软删除)`

使用`@TableLogic`标记哪个属性为逻辑删除的字段，**注意与数据库字段的对应关系**

```java
package com.example.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    @TableField(value = "pwd", select = false)
    private String password;
    private Integer age;
    private String tel;
    @TableField(exist = false)
    private Integer isOnline;

    // 逻辑删除字段，value指的是没删除的，delval指定的是删除的
    @TableLogic(value = "0", delval = "1")
    private Integer deleted;
}
```



### 乐观锁

> 乐观锁用于处理并发问题，例如秒杀业务，多个用户同时对一个商品进行抢购，需要加锁。
>
> **注意：应对小型高并发（2000以下）没问题，大型并发不适宜**
>
> 
>
> 实现步骤：
>
> 1. 创建version字段和属性，用`@Version`标记
> 2. 添加`乐观锁拦截器`

```java
@Data
public class User {
    private Long id;
    private String username;
    @TableField(value = "pwd", select = false)
    private String password;
    private Integer age;
    private String tel;
    @TableField(exist = false)
    private Integer isOnline;

    @TableLogic(value = "0", delval = "1")
    private Integer deleted;

    // 乐观锁
    @Version
    private Integer version;
}
```

配置乐观锁拦截器

```java
@Configuration
public class MyBatisPlusInterceptorConfig {

    @Bean
    public MybatisPlusInterceptor myBatisPlusInterceptor(){
        // 定义拦截器
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 乐观锁拦截器
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

测试

```java
@Test
public void testVersionUpdate(){
    /**
     * 一般操作先查询再修改，确保更新的对象附带有 version,
     */
    User user = userDao.selectById(2L);
    user.setUsername("tony");
    userDao.updateById(user);
}
    
```



## MyBatis-Plus全局配置

在`application.yml`配置文件中

```yml
# MyBatis-Plus配置
mybatis-plus:
  configuration:
    # 控制台sql语句的日志 (标准输出)
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    # 关闭 mybatis-plus 的 banner
    banner: false
    db-config:
      # 更改默认的 id 生成策略
      id-type: assign_id
      # 设置表的前缀
      table-prefix: tb_
      # 逻辑删除
      logic-delete-field: deleted
      logic-not-delete-value: 0
      logic-delete-value: 1
```



## 代码生成器

> MyBatis-Plus代码生成器可以生成常见且通用的模板代码
>
> 实现步骤：
>
> 1. 导入相关依赖
> 2. 编写生成器

导入依赖

```xml
<!-- MyBatis-Plus代码生成器 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
<!-- velocity模板引擎 -->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
```

编写生成器

新建代码生成器类` CodeGenerator.java`

> **注意：**需要根据自己的需求做局部修改！！！

```java
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;

public class CodeGenerator {

    public static void main(String[] args) {
        AutoGenerator autoGenerator = new AutoGenerator();

        /* 配置数据源 */
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
        dataSourceConfig.setUrl("jdbc:mysql://localhost:3306/MyBatisTest?serverTimezone=UTC");
        dataSourceConfig.setUsername("root");
        dataSourceConfig.setPassword("123456");
        autoGenerator.setDataSource(dataSourceConfig);

        /* 设置全局配置 */
        GlobalConfig globalConfig = new GlobalConfig();
        globalConfig.setOutputDir(System.getProperty("user.dir") + "/src/main/java");
        globalConfig.setOpen(false);                    // 生成完毕后是否打开代码所在的目录
        globalConfig.setAuthor("(´･_･`)");              // 设置作者
        globalConfig.setFileOverride(true);             // 是否覆盖原始生成的代码
        globalConfig.setMapperName("%sMapper");         // 设置数据层接口名，%s为占位符，指代模块名称
        globalConfig.setIdType(IdType.ASSIGN_ID);       // 设置id生成策略
        autoGenerator.setGlobalConfig(globalConfig);

        /* 包配置 */
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.junyi");           // 设置生成的包名
        packageConfig.setEntity("pojo");                // 设置实体类包名
        packageConfig.setMapper("mapper");              // 设置数据层包名
        packageConfig.setService("service");            // 设置业务层包名
        autoGenerator.setPackageInfo(packageConfig);

        /* 策略设置 */
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setInclude("tb_user");               // setInclude 注意这个, 参数为即将要生成的表的名称，可以设置多个表
        strategyConfig.setTablePrefix("tb_");               // 设置数据库表的前缀名称，模块名 = 数据库表名 - 前缀名
        strategyConfig.setRestControllerStyle(true);        // 是否启用Rest风格
        strategyConfig.setVersionFieldName("version");      // 设置乐观锁字段名
        strategyConfig.setLogicDeleteFieldName("deleted");  // 设置逻辑删除字段名
        strategyConfig.setEntityLombokModel(true);          // 是否启用lombok
        autoGenerator.setStrategy(strategyConfig);

        /* 执行操作 */
        autoGenerator.execute();
    }

}
```



## 新建MyBatis模板

> 解决新建MyBatis配置文件每次都要写文件头的繁琐步骤

![image-20220825161222705](https://gitee.com/my-images/typora-imgs/raw/master/image-20220825161222705.png)



