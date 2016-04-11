<?php 
include_once("permission.php");
?>
<?php
	$query="select * from `".$prefix."category` where `rank`=1 and `tag`=1 order by `order` ASC";
	$info=$sql_func->mselect($query);
	if(count($info)>0){
?>
<ul id="nav">
	<?php
		for($i=0;$i<count($info);$i++){
	?>
	<li class="first">
    <?php 
		if($info[$i]["type"]==1){
			echo "<a href=\"#\">".$info[$i]["name"]."</a>";
		}else if($info[$i]["type"]==2){
			echo "<a href=\"news_list.php?cid=".$info[$i]["id"]."\" target=\"".($info[$i]["target"]==1?"_self":"_blank")."\">".$info[$i]["name"]."</a>";
		}else if($info[$i]["type"]==3){
			echo "<a href=\"".$info[$i]["url"]."\" target=\"".($info[$i]["target"]==1?"_self":"_blank")."\">".$info[$i]["name"]."</a>";
		}
	?>
		<?php
			$param=$info[$i]["id"];
			$param="select * from `".$prefix."category` where `rank`=2 and `up_id`='$param' and `tag`=1 order by `order` ASC";
			$param=$sql_func->mselect($param);
			if(count($param)>0){
		?>
		<ul class="sub">
			<?php 
                for($j=0;$j<count($param);$j++){
            ?>
			<li>
			<?php 
                if($param[$j]["type"]==1){
                    echo "<a href=\"#\">".$param[$j]["name"]."</a>";
                }else if($param[$j]["type"]==2){
                    echo "<a href=\"news_list.php?cid=".$param[$j]["id"]."\" target=\"".($param[$j]["target"]==1?"_self":"_blank")."\">".$param[$j]["name"]."</a>";
                }else if($param[$j]["type"]==3){
                    echo "<a href=\"".$param[$j]["url"]."\" target=\"".($param[$j]["target"]==1?"_self":"_blank")."\">".$param[$j]["name"]."</a>";
                }
            ?>
				<?php 
					$param=$param[$j]["id"];
					$param="select * from `".$prefix."category` where `rank`=3 and `up_id`='$param' and `tag`=1 order by `order` ASC";
					$param=$sql_func->mselect($param);
					if(count($param)>0){
				?>
				<ul>
					<?php 
                        for($k=0;$k<count($param);$k++){
                    ?>
					<li>
						<?php 
                            if($param[$k]["type"]==1){
                                echo "<a href=\"#\">".$param[$k]["name"]."</a>";
                            }else if($param[$k]["type"]==2){
                                echo "<a href=\"news_list.php?cid=".$param[$k]["id"]."\" target=\"".($param[$k]["target"]==1?"_self":"_blank")."\">".$param[$k]["name"]."</a>";
                            }else if($param[$k]["type"]==3){
                                echo "<a href=\"".$param[$k]["url"]."\" target=\"".($param[$k]["target"]==1?"_self":"_blank")."\">".$param[$k]["name"]."</a>";
                            }
                        ?>
                    </li>
					<?php 
                        }
                    ?>
				</ul>
				<?php }?>
			</li>
		<?php 
			}
		?>
		</ul>
		<?php }?>
	</li>
	<?php 
		}
	?>
</ul>
<?php } unset($param);?>