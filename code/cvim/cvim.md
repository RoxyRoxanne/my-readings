
    vim slides presentation tool
    How to Do 90% of What Plugins Do (With Just Vim)-XA2WjJbmmoM.mp4
      file navigating
        set path+=**
          search files through every subdirectory
        :find <somefile>
        :find *<name>
          wildcard
        :find *.js
        :b <unique_substring>
          if substring is unique for a file, it jumps into it directly
      tag navigation
        command! MakeTags !ctags -R .
        :MakeTags 
        g^]
          when tags are ambigous
      autocomplete
        ^x^n for JUST this file
        ^x^f for filenames (works with our path trick!)
        ^x^] for tags only
        ^n for anything specified by the 'complete' option
      snippets
        nnoremap ,html :-1read $HOME/.vim/.skeleton.html<CR>3jwf>a
    https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118
      { }
        move to start/end of paragraph
      :1,5 g/../..
      :r foo
        insert file "foo" at current line
      :r! cmd
        run command cmd and redirect its output to here
      :{!}fmt
        reformat current paragraph
      run macros
        :so mymacro.ex
          ex: runs wc and insrets a comment at top
        vi +'so mymacro.ex' ./file
        vi +'/foo/d|wq!' ./file
    multiple global commands at once
      http://stackoverflow.com/questions/11807713/multiple-g-and-v-commands-in-one-statement
      code
        command! -nargs=* -range=% G <line1>,<line2>call MultiG(<f-args>)
        fun! MultiG(...) range
           let pattern = ""
           let command = ""
           for i in a:000
              if i[0] == "-"
                 let pattern .= "\\(.*\\<".strpart(i,1)."\\>\\)\\@!"
              elseif i[0] == "+"
                 let pattern .= "\\(.*\\<".strpart(i,1)."\\>\\)\\@="
              else
                 let command = i
              endif
           endfor
           exe a:firstline.",".a:lastline."g/".pattern."/".command
        endfun
      This creates a command that allows you to automate the "regex hack". This way you could do
        :G +foo -bar
      to get all lines with foo and not bar. If an argument doesn't start with + or - then it is considered the command to add on to the end of the :g command. So you could also do
        :G d +foo -bar
      to delete the lines, or even
        :G norm\ foXp +two\ foos -bar
      if you escape your spaces. It also takes a range like :1,3G +etc, and you can use regex in the search terms but you must escape your spaces. Hope this helps.
    history
      :redir @a>
      :history : -20,
      :redir END
    convert spreadsheet table to a hierarchical votl format id=b_015
      convert spreadsheet table to a hierarchical votl format <url:#r=b_015>
      procedure
        put ~ to the last column in excel
        %s/[^[:print:][:blank:]]//g
        g/^\s*\~$/d
        g/^\s*$/d
        g/"\([^"~]\+\n\)\+"\s*\~$/j
        g/"\([^"~]\+\n\)\+"\s*\~$/j
        g/"\([^"~]\+\n[^"~]\+\)\+"/j
        g/"\([^"~]\+\n[^"~]\+\)\+"/j
        g/"\([^"~]\+\n[^"~]\+\)\+"/j
        g/"\([^"~]\+\n[^"~]\+\)\+"/j
        %s/\t/,/
        set ft=csv
        DeleteColumn 2
        DeleteColumn 2
        DeleteColumn 2
        DeleteColumn 3
        %s/^/@@0/ | %s/\t/@@1/ | %s/\t/@@2/ | %s/\t/@@3/
        %s/@@0/## / | %s/@@1/\r\t@@1 / | %s/@@2/\r\t@@2 / 
        g/##\s*$/d
        set ft=votl
      join multi line cells
        opt
          make a macro ci"
        how to match multiline regex
          "[^"]\+\n[^"]\+"
        join newlines
          g/"[^"]\+\n[^"]\+"/j
          run this multiple times
        don't match single line quotes
        blank lines are not matched?
          "\([^"]\+\n[^"]\+\)\+"
          "[^"]\+\n
          \([^"]\|$\)\+
          "\(\([^"]\+\n[^"]\+\)\|\(^$\)\)\+"
          what are these groups called?
        delete blank lines
        do it manually
          g/"\([^"]\+\n[^"]\+\)\+"/j
        remove invisible chars
        lines that have a single quote
          "\([^"]\+\n[^"]\+\)\+"
          "\([^"]\+\n\)\+"
          "\([^"]\+\n"\)
      error: Application service monitoring line broken
        cause: previous line
          "\([^"]\+\n[^"]\+\)\+"
          problem case
            "Informasiya "  
            Application "ali"
          how to invalidate this case?
            this is impossible to solve
              her kayıtın sonuna ~ koyalım
              sonra replacement işlemlerinde ~ ile sınırlandıralım
              "\([^"~]\+\n[^"~]\+\)\+"
            how can I find each instance end?
              count tabs?
                no it won't work
              put tilda into google docs
                ~
              correct prev regex
                "\([^"~]\+\n\)\+"\s*\~$
    Fayda örneği:
      case1: Onlarca dosyada hatalı bir formatta veriyi yazmışım:
        `<url:file:///` yazacağıma `<url:/` yazmışım
        düzeltmek için tek komut yetti:
        bufdo %s#url:file:///#url:file:///# 
    vinegar
      bookmarking a directory
        mb        mark bookmark
        {cnt}gb   go back to bookmarked dir
        mB        delete bookmark
      shortcuts
        I   help
        i   file information
        -   open explorer
        enter     open file
        o         open horizontal split
        v         open vertical split
        .         prepopulate command line
        !         prepop with bang
        cg cl     add to cd lcd
        :Ntree    change path
        a         switch appearance of files
        d         new dir
        %         new file
        file copying
          mt      mark target dir
          mf      mark files
          mc      copy files
    TableMode
      https://github.com/dhruvasagar/vim-table-mode
      start using
        :TableModeToggle
          ütm
      table mode
        enter first line
          | col1 | col2 |
        second line
          ||
        body lines
          | content 1 |
        last line
          ||
      convert existing content into a table
        :Tableize
          ütt
        default separator: ,
          g:table_mode_tableize_map
        :Tableize/;
          separator: ;
          üT
            take input from cmd line
      examples
        can be indented too
        | col 1 | col 2  |
        |-------|--------|
        | pg1   | pg 2   |
        | cl15  | cl35_a |
        |-------|--------|
    voom
      outline navigation
      outline navigation in tree
        click    move
        i I    beginning of node
        space    toggle node
        left/right    to parent/child
      voomgrep
        very sophisticated search tool
      moving
        ^^  ^up  üu
        --  ^dn  üd
        <<  ^lf  ül
        >>  ^rg  ür
        yy  "+ register
        dd
        pp
    Transpose a csv file
      :Transpose
      :CsvTranspose
    map-arguments
      :h map-arguments
        description
          "<buffer>", "<nowait>", "<silent>", "<special>", "<script>", "<expr>" and
          "<unique>" can be used in any order.  They must appear right after the
          command, before any other arguments.
        :map <buffer>  ,w  /[.,;]<CR>
          mapping is effective only in current buffer
        <nowait>
          overriding global mapping
        <silent>
          mapping will not be echoed on command line
      :h <Plug>
        special key name "Plug" for internal mapping
      using-<Plug>
      <SID>
          
    <Plug> to customize hotkeys
      http://whileimautomaton.net/2008/09/27022735
      normal hotkey customization
        let g:plugin_feature_hotkey = '<F2>'
      problems:
        only 1 hotkey
        modes cannot be overridden
        some plugins add a prefix. it can't be overridden
      better way
        1. plugins provide a "named" key sequence for each feature
          <Plug>(plugin-feature)
        2. users use :map to map any key sequence
      author of plugin
        " named key sequence
        nnoremap <silent> <Plug>(fakeclip-p)
        \ :<C-u>call fakeclip#put('', 'p')<Return>
        nnoremap <silent> <Plug>(fakeclip-Y)
        \ :<C-u>call fakeclip#yank_Y()<Return>
        " default hotkeys
        nmap "*p <Plug>(fakeclip-p)
        nmap "*y <Plug>(fakeclip-Y)
        nmap "*yy <Plug>(fakeclip-Y)
      users customize named key sequences:
        nmap <C-v> <Plug>(fakeclip-p)
      running <Plug> mapping
        http://stackoverflow.com/questions/18546533/execute-plug-commands-in-vim
        :execute "normal \<Plug>NiceCenterCursor"
    vimproc
      install
        $ make
          from vimproc repo
      examples  
        let file = vimproc#fopen("./meta.R", "O_RDONLY", 0)
        let res = file.read()
        call file.close()
        new
        call append(0, split(res, '\r\n\|\r\|\n'))
    vimfiler
      help
        :VimFiler # run
        :let g:vimfiler_as_default_explorer = 1  # default explorer
        :VimFilerExplorer # sidebar
        :VimFilerDouble # double pane
        :VimFilerCurrentdir
      default keymappings
        problem/does not work
          <Enter>     <Plug>(vimfiler_cd_or_edit)
        basic
          <BS>      <Plug>(vimfiler_switch_to_parent_directory)
          a cd  change current directory 
          t     <Plug>(vimfiler_expand_tree)
          gs      <Plug>(vimfiler_toggle_safe_mode)
          e     <Plug>(vimfiler_edit_file)
          T     <Plug>(vimfiler_expand_tree_recursive)
          o     <Plug>(vimfiler_expand_or_edit)
          a     <Plug>(vimfiler_choose_action)
          <Space>     <Plug>(vimfiler_toggle_mark_current_line)
        file commands
          yy      <Plug>(vimfiler_yank_full_path)
          c     <Plug>(vimfiler_copy_file)
          m     <Plug>(vimfiler_move_file)
          d     <Plug>(vimfiler_delete_file)
          r     <Plug>(vimfiler_rename_file)
          K     <Plug>(vimfiler_make_directory)
          N     <Plug>(vimfiler_new_file)
        directories
          gc      <Plug>(vimfiler_cd_vim_current_dir)
          L     <Plug>(vimfiler_switch_to_drive)
          <url:file:///~      <Plug>(vimfiler_switch_to_home_directory)>
          \     <Plug>(vimfiler_switch_to_root_directory)
          &     <Plug>(vimfiler_switch_to_project_directory)
          <C-j>     <Plug>(vimfiler_switch_to_history_directory)
        switch windows
          <Tab> (default)
                <Plug>(vimfiler_switch_to_another_vimfiler)
          <Tab> (enabled "no-quit" and "split" options)
                <Plug>(vimfiler_switch_to_other_window)
          q     <Plug>(vimfiler_hide)
          Q     <Plug>(vimfiler_exit)
          -     <Plug>(vimfiler_close)
          g?      <Plug>(vimfiler_help)
        system-shell
          v     <Plug>(vimfiler_preview_file)
          ge      <Plug>(vimfiler_execute_external_filer)
          H     <Plug>(vimfiler_popup_shell)
          !     <Plug>(vimfiler_execute_shell_command)
          gr      <Plug>(vimfiler_grep)
          gf      <Plug>(vimfiler_find)
          Y     <Plug>(vimfiler_pushd)
          P     <Plug>(vimfiler_popd)
      steps
        plug keymappings nerede tanımlanıyor?
          vimfiler_cd_input_directory
          nnoremap <buffer><silent> <Plug>(vimfiler_cd_input_directory)
                \ :<C-u>call <SID>cd_input_directory()<CR>
        utl ile help url'lerine nasıl link veriliyordu?
          <url:vimhelp:vimfiler-default-key-mappings>
    ctags
      https://andrew.stwrt.ca/posts/vim-ctags/
        41 languages supported
        using ctags
          ctags -R .
          ctags -R -f ./.git/tags .
            put tags file into .git
        using in vim
          :tag function_name
        vim commands
          :tag /^asserts_*
            find all tags that start with asserts_
          :ts :tselect
          : show list
          :tn :tnext
          :tp
          :tf :tfirst
          :tl :tlast
          :tags
            show tags you've traversed
        vim+ctags+ctrlp
          :CtrlPTag
          nnoremap <leader>.. :CtrlPTag<cr>
        vim+ctags+tagbar
          nnoremap <silent> <Leader>b :TagbarToggle<cr>
            pops up in sidebar
            show tags organized
        <url:file:///.ctags>
          <url:file:///~/.ctags>
          configuration
        help
          :help exuberant-ctags
      https://github.com/ludovicchabant/vim-gutentags
        <url:~/.vimrc#tn=gutentags>
      http://andrewradev.com/2011/06/08/vim-and-ctags/
        :Function foo
          list functions that start with foo in quickfix
    ctrlp
      CtrlP Help
        :CtrlP
          starting dir: g:ctrlp_working_path_mode
          let g:ctrlp_working_path_mode = 'ra'
            c: current file's dir
            a: when cwd isn't ancestor of dir of current file
            r: ancestor dir containing: .git
            0: disable
      Basic commands
        Once CtrlP is open:
          F5  refresh cache
          <c-f> and <c-b> 
            to cycle between modes.
          <c-j>, <c-k> or the arrow keys 
            to navigate the result list.
          search modes
            <c-d> 
              to switch to filename only search instead of full path.
            <c-r> 
              to switch to regexp mode.
          <c-t> or <c-v>, <c-x> 
            to open a new tab or in a new split.
          <c-n>, <c-p> 
            next/previous string in history.
          <c-y> 
            to create a new file and its parent directories.
          <c-z> 
            to mark/unmark multiple files and <c-o> to open them.
        :help ctrlp-mappings or submit ? in CtrlP for more mapping help.
          <url:file:///.. >
            go up the directory tree by one or multiple levels.
          :command at the end of input
            Use :25 to jump to line 25. Use :diffthis when opening multiple files to run :diffthis on the first 4 files.


